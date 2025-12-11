"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import {
  loginSchema,
  updateProductSchema,
  updateUserSchema,
} from "./validation";
import { UpdateProductFormInputs } from "./definitions";

// USER
export async function login(
  initialState: { error: string; success: string },
  formData: FormData,
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.message ||
      "Dati di accesso non validi. Riprova più tardi.";
    return {
      ...initialState,
      error: errorMessage,
    };
  }

  // const { data: user, error } = await supabase.auth.signInWithPassword(
  const { error } = await supabase.auth.signInWithPassword(
    validatedFields.data,
  );

  if (error) {
    const errorMessage =
      error.message || "Errore durante l'accesso. Riprova più tardi.";
    return {
      ...initialState,
      error: errorMessage,
      errors: {},
    };
  }

  // console.log(user);

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

// The function has some issues and could be improved for clarity and correctness.
// 1. It throws an error for duplicate email, which will cause an unhandled rejection in the client (unless caught).
// 2. It both throws and also tries to redirect on error, which is unreachable after a throw.
// 3. It returns the raw user object, which may not be what the client expects (should probably return a state object).
// 4. It does not handle the case where signUp returns neither user nor error (should be rare, but possible).
// 5. It does not return a message to the client on success, so the client cannot show a success message.
export async function signup(
  initialState: { error: string; success: string },
  formData: FormData,
) {
  const supabase = await createClient();

  const extractedData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = loginSchema.safeParse(extractedData);

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.message ||
      "Dati di registrazione non validi. Riprova.";
    return {
      ...initialState,
      error: errorMessage,
    };
  }

  const { data: user, error } = await supabase.auth.signUp({
    ...extractedData,
    options: {
      data: {
        fullName: "",
        avatar: "",
      },
    },
  });

  // Handle duplicate email (Supabase returns user with empty identities array)
  if (user?.user && !user.user.identities?.length) {
    return {
      ...initialState,
      error: "Questa email è già stata registrata.",
    };
  }

  // Handle other errors
  if (error) {
    return {
      ...initialState,
      error: error.message || "Errore durante la registrazione. Riprova.",
    };
  }

  // console.log(user);

  if (user) {
    return {
      ...initialState,
      error: "",
      success:
        "Account creato con successo! Ti abbiamo inviato un link alla tua email per confermare la tua identità e poter accedere al tuo account.",
    };
  }

  // If registration is successful, revalidate and redirect
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/");
}

export async function updateCurrentUser({
  newPassword,
  name,
  avatar,
}: {
  newPassword?: string;
  name?: string;
  avatar?: File | string;
}) {
  // Basic server-side input validation
  const validationData: {
    name?: string;
    password?: string;
  } = {};

  if (name !== undefined) validationData.name = name;
  if (newPassword !== undefined) validationData.password = newPassword;
  // add file validation

  // Validate using Zod schema
  const validatedFields = updateUserSchema.safeParse(validationData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.issues);
    throw new Error(
      "Dati non validi: " +
        validatedFields.error.issues.map((i) => i.message).join(", "),
    );
  }

  //Data are valid
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message || "User not authenticated");
  }

  const updatedData: {
    password?: string;
    data?: { [key: string]: string };
  } = {};

  if (newPassword) updatedData.password = newPassword;

  // ✅ Aggiorna metadati iniziali (solo stringhe)
  if (name || typeof avatar === "string") {
    updatedData.data = {};
    if (name) updatedData.data.fullName = name;
    if (typeof avatar === "string") {
      updatedData.data.avatar = avatar;
    }
  }

  const { error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  // If avatar is string or not provided, return early
  if (!avatar || typeof avatar === "string") {
    revalidatePath("/dashboard/account");
    return;
  }

  // ✅ A questo punto avatar è sicuramente un File
  const userId = user.id;

  const timestamp = Date.now();
  const fileName = `avatar-${user.id}-${timestamp}`;
  const filePath = `${userId}/${fileName}`;

  // Rimuovi il vecchio avatar prima di caricare il nuovo
  try {
    const { data: existingFiles } = await supabase.storage
      .from("avatars")
      .list(userId);

    if (existingFiles && existingFiles.length > 0) {
      // Rimuovi tutti i vecchi avatar per questo utente
      const filesToRemove = existingFiles
        .filter((file) => file.name.startsWith(`avatar-${userId}-`))
        .map((file) => `${userId}/${file.name}`);

      if (filesToRemove.length > 0) {
        await supabase.storage.from("avatars").remove(filesToRemove);
        // console.log("Removed old avatars:", filesToRemove);
      }
    }
  } catch (cleanupError) {
    console.warn("Could not cleanup old avatars:", cleanupError);
  }

  // ✅ Carica il nuovo file
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, avatar, {
      upsert: true,
    });

  if (uploadError) {
    console.error(uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // Update user metadata with new avatar URL
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar: urlData.publicUrl },
  });

  if (updateError)
    throw new Error(`Profile update failed: ${updateError.message}`);

  revalidatePath("/dashboard/account");
}

// PRODUCT
export async function createProduct(data: UpdateProductFormInputs) {
  // Estrai i dati dal FormData
  const productData = {
    name: data.name.slice(0, 1000),
    regularPrice: Number(data.regularPrice),
    discount: Number(data.discount) || 0,
    quantity: Number(data.quantity),
    type: data.type.slice(0, 1000),
    ingredients: data.ingredients.slice(0, 1000),
    description: data.description.slice(0, 1000),
    info: data.info.slice(0, 1000),
    details: data.details.slice(0, 1000),
  };

  // Gestisci le immagini
  const imageFiles = data.image ? Array.from(data.image) : [];

  const validImageFiles = imageFiles.filter(
    (file) => file instanceof File && file.size > 0,
  );

  // Converti i prezzi in centesimi
  const extractedData = {
    ...productData,
    regularPrice: Math.round(productData.regularPrice * 100),
    discount: Math.round(productData.discount * 100),
  };

  // // Valida i dati del prodotto
  const validatedFields = updateProductSchema.safeParse(extractedData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.issues);
    throw new Error(
      "Dati non validi: " +
        validatedFields.error.issues.map((i) => i.message).join(", "),
    );
  }

  const supabase = await createClient();

  // 1. Inserisci il prodotto nel database
  const { data: product, error: insertError } = await supabase
    .from("products")
    .insert(validatedFields.data)
    .select("id")
    .single();

  if (insertError) {
    console.error("Database error:", insertError);
    throw new Error("Impossibile creare il prodotto: " + insertError.message);
  }

  // 2. Upload delle immagini se presenti
  const uploadedImages: string[] = [];

  if (validImageFiles.length > 0) {
    for (let i = 0; i < validImageFiles.length; i++) {
      const file = validImageFiles[i];

      // Genera un nome file unico
      const fileExtension = file.name.split(".").pop();
      const fileName = `product-${product.id}-${i}-${Date.now()}.${fileExtension}`;
      // const filePath = `products/${fileName}`;

      // Upload del file
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error(
          `Errore nel caricamento dell'immagine ${i}:`,
          uploadError,
        );
        continue; // Salta questa immagine ma continua con le altre
      }

      // Ottieni l'URL pubblico
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      uploadedImages.push(publicUrl);
    }

    // 3. Aggiorna il prodotto con gli URL delle immagini
    const { error: updateError } = await supabase
      .from("products")
      .update({ image: uploadedImages })
      .eq("id", product.id);

    if (updateError) {
      console.error(
        "Errore nell'aggiornare le immagini del prodotto:",
        updateError,
      );
      // Non fallire completamente, ma logga l'errore
    }
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/products/create");
  // redirect("/dashboard/products");
  // revalidatePath(`/dashboard/products/${product.id}`);

  return { success: true, productId: product.id };
}

export async function updateProduct(id: string, data: UpdateProductFormInputs) {
  // Estrai i dati dal FormData
  const productData = {
    name: data.name.slice(0, 1000),
    regularPrice: data.regularPrice,
    discount: data.discount || 0,
    quantity: Number(data.quantity),
    type: data.type,
    ingredients: data.ingredients,
    description: data.description,
    info: data.info,
    details: data.details,
  };

  // Converti i prezzi in centesimi
  const extractedData = {
    ...productData,
    regularPrice: Math.round(productData.regularPrice * 100),
    discount: Math.round(productData.discount * 100),
  };

  // console.log(extractedData);

  // Valida i dati del prodotto
  const validatedFields = updateProductSchema.safeParse(extractedData);

  if (!validatedFields.success) {
    console.error(validatedFields.error.message);
    throw new Error(
      "Dati non validi: " +
        validatedFields.error.issues.map((i) => i.message).join(", "),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update(validatedFields.data)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be updated");
  }

  revalidatePath("/dashboard/products");
}

export async function deleteProduct(name: string) {
  const supabase = await createClient();

  // 1. Get product by name to retrieve its image URLs
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image")
    .eq("name", name)
    .single();

  if (fetchError) {
    console.error("Failed to fetch product for deletion:", fetchError);
    throw new Error("Could not find product to delete.");
  }

  // 2. Extract file paths from image URLs
  const imageUrls: string[] = product?.image || [];
  const filePaths = imageUrls.map((url) => {
    const urlParts = url.split("/");
    return `${urlParts[urlParts.length - 1]}`;
  });

  // console.log(filePaths);

  // 3. Delete product from database
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("name", name);

  if (deleteError) {
    console.error(deleteError);
    throw new Error("Product could not be deleted");
  }

  // 4. Delete images from storage (if any)
  if (filePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("product-images")
      .remove(filePaths);

    if (storageError) {
      console.error("Error deleting images from storage:", storageError);
      // Continue without throwing; product already deleted
    }
  }

  // 5. Revalidate product listing
  revalidatePath("/dashboard/products");
}

function getFileNameFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export async function deleteProductImage(name: string, img: string) {
  const supabase = await createClient();

  // 1. Get the product by name
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("id, image")
    .eq("name", name)
    .single();

  if (fetchError || !product) {
    console.error("Failed to fetch product for deletion:", fetchError);
    throw new Error("Could not find product to delete image from.");
  }

  // 2. Remove the image from the array
  const updatedImages = product.image.filter((i: string) => i !== img);

  // 3. Update the product's image array in the DB
  const { error: updateError } = await supabase
    .from("products")
    .update({ image: updatedImages })
    .eq("name", name);

  if (updateError) {
    console.error("Failed to update product images:", updateError);
    throw new Error("Could not update product images.");
  }

  // 4. Extract the relative file path from the URL
  const relativePath = getFileNameFromUrl(img);
  // console.log(relativePath);

  if (!relativePath) {
    console.warn("Could not extract relative path from image URL:", img);
    return { success: false, message: "Invalid image URL" };
  }

  // 5. Delete the file from Supabase storage
  const { error: storageError } = await supabase.storage
    .from("product-images")
    .remove([relativePath]);

  if (storageError) {
    console.error("Error deleting image from storage:", storageError);
    // Optional: continue without throwing
  }

  // 5. Revalidate product listing
  revalidatePath(`/dashboard/products/${product.id}`);
}

export async function addProductImages(id: number, formData: FormData) {
  const supabase = await createClient();
  // Estrai i file immagine dal formData
  const imageFiles = formData.getAll("images") as File[];
  // Filtra file validi: deve essere un File, un'immagine valida e < 1MB
  const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
  const validImageFiles = imageFiles.filter(
    (file) =>
      file instanceof File &&
      file.size > 0 &&
      file.size < MAX_FILE_SIZE &&
      file.type.startsWith("image/"),
  );
  if (validImageFiles.length === 0) {
    throw new Error("File non valido o troppo grande.");
  }

  // Recupera le immagini esistenti dal prodotto
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .single();

  if (productError) {
    console.error("Errore nel recuperare il prodotto:", productError);
    throw new Error(
      "Errore imprevisto durante il caricamento delle immagini. Riprova più tardi.",
    );
  }
  // Prepara l'array delle immagini già esistenti (o vuoto)
  const existingImages: string[] = product?.image ?? [];
  // Array dove metteremo gli URL appena caricati
  const uploadedImages: string[] = [];
  // Array dove metteremo i nomi delle immagini che non sono state caricate per mostrare all'utente
  const notUploadedImages: string[] = [];

  for (let i = 0; i < validImageFiles.length; i++) {
    const file = validImageFiles[i];
    // Genera nome file unico
    const fileExtension = file.name.split(".").pop();
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const fileName = `product-${id}-${i}-${Date.now()}-${uniqueId}.${fileExtension}`;

    // Carica file su Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadError) {
      console.error(`Errore nel caricamento dell'immagine ${i}:`, uploadError);
      notUploadedImages.push(file.name);
      continue;
    }

    // Ottieni URL pubblico
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName);

    uploadedImages.push(publicUrl);
  }

  if (uploadedImages.length === 0) {
    console.log("Nessuna immagine è stata caricata correttamente.");
    throw new Error(
      "Nessuna immagine è stata caricata correttamente. Riprova più tardi.",
    );
  }

  // Unisci le immagini vecchie con quelle nuove
  const updatedImages = existingImages.concat(uploadedImages);

  // Aggiorna il prodotto con il nuovo array di immagini
  const { error: updateError } = await supabase
    .from("products")
    .update({ image: updatedImages })
    .eq("id", id);

  if (updateError) {
    console.error(
      "Errore nell'aggiornare le immagini del prodotto:",
      updateError,
    );
  }

  revalidatePath(`/dashboard/products/${id}`);
  return { success: true, notUploadedImages };
}

// ORDER
export async function confirmOrder(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Non è stato possibile confermare l'ordine", error);
    throw new Error(
      "Errore imprevisto durante la conferma. Riprova più tardi.",
    );
  }

  revalidatePath("/dashboard/orders");
}
