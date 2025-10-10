import { z } from "zod";

export const loginSchema = z.object({
  email: z.string("Email non valida"),
  password: z.string("Password non valida").max(20),
});

export const updateProductSchema = z
  .object({
    name: z.string().min(1, "Il nome è obbligatorio"),
    regularPrice: z
      .number({
        error: (iss) =>
          iss.input === undefined
            ? "Il prezzo è obbligatorio."
            : "Il prezzo deve essere un numero.",
      })
      .positive("Il prezzo deve essere maggiore di zero"),

    discount: z
      .number("Lo sconto deve essere un numero")
      .min(0, "Lo sconto non può essere negativo")
      .optional()
      .nullable(),

    quantity: z
      .number({
        error: (iss) =>
          iss.input === undefined
            ? "La quantità è obbligatoria."
            : "La quantità deve essere un numero.",
      })
      .int("La quantità deve essere un numero intero")
      .nonnegative("La quantità non può essere negativa"),

    type: z.enum(["food", "drink"], { error: "Il tipo è obbligatorio" }),

    description: z.string().min(1, "La descrizione è obbligatoria"),
    ingredients: z.string().min(1, "Gli ingredienti sono obbligatori"),
    info: z.string().min(1, "Le informazioni nutrizionali sono obbligatorie"),
    details: z.string().min(1, "I dettagli sono obbligatori"),
    // image: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      // If discount is defined, ensure it is less than regularPrice
      return data.discount == null || data.discount < data.regularPrice;
    },
    {
      path: ["discount"],
      message: "Lo sconto non può essere maggiore o uguale al prezzo",
    },
  );

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Il nome è obbligatorio")
    .min(2, "Il nome deve contenere almeno 2 caratteri")
    .max(50, "Il nome non può superare i 50 caratteri")
    .regex(
      /^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]+$/,
      "Il nome contiene caratteri non validi",
    )
    .optional(),

  password: z
    .string()
    .min(6, "La password deve contenere almeno 8 caratteri")
    .max(20, "La password non può superare i 20 caratteri")
    .optional(),
});

// // File validation constants
// export const AVATAR_VALIDATION = {
//   MAX_SIZE: 5 * 1024 * 1024, // 5MB
//   ALLOWED_TYPES: [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//   ] as const,
//   ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"] as const,
//   MAX_DIMENSIONS: { width: 2048, height: 2048 },
// } as const;

// // Type definitions
// export type AllowedImageType = (typeof AVATAR_VALIDATION.ALLOWED_TYPES)[number];
// export type AllowedImageExtension =
//   (typeof AVATAR_VALIDATION.ALLOWED_EXTENSIONS)[number];

// // Validation functions
// export function validateImageFile(file: File): {
//   valid: boolean;
//   error?: string;
// } {
//   // Check file size
//   if (file.size > AVATAR_VALIDATION.MAX_SIZE) {
//     return {
//       valid: false,
//       error: `Il file è troppo grande. Dimensione massima: ${AVATAR_VALIDATION.MAX_SIZE / 1024 / 1024}MB`,
//     };
//   }

//   // Check if file size is 0
//   if (file.size === 0) {
//     return {
//       valid: false,
//       error: "Il file è vuoto o corrotto",
//     };
//   }

//   // Check file type using type guard
//   const isValidMimeType = (type: string): type is AllowedImageType => {
//     return (AVATAR_VALIDATION.ALLOWED_TYPES as readonly string[]).includes(
//       type,
//     );
//   };

//   if (!isValidMimeType(file.type)) {
//     return {
//       valid: false,
//       error: `Tipo di file non supportato. Tipi ammessi: ${AVATAR_VALIDATION.ALLOWED_TYPES.join(", ")}`,
//     };
//   }

//   // Check file extension with type guard
//   const extension = file.name
//     .toLowerCase()
//     .substring(file.name.lastIndexOf("."));
//   const isValidExtension = (ext: string): ext is AllowedImageExtension => {
//     return (AVATAR_VALIDATION.ALLOWED_EXTENSIONS as readonly string[]).includes(
//       ext,
//     );
//   };

//   if (!isValidExtension(extension)) {
//     return {
//       valid: false,
//       error: `Estensione non supportata. Estensioni ammesse: ${AVATAR_VALIDATION.ALLOWED_EXTENSIONS.join(", ")}`,
//     };
//   }

//   // Check if filename has an extension
//   if (!extension || extension === file.name.toLowerCase()) {
//     return {
//       valid: false,
//       error: "Il file deve avere un'estensione valida",
//     };
//   }

//   return { valid: true };
// }

// // Validate image dimensions (requires canvas or image processing)
// export async function validateImageDimensions(
//   file: File,
// ): Promise<{ valid: boolean; error?: string }> {
//   return new Promise((resolve) => {
//     const img = new Image();
//     // const canvas = document.createElement("canvas");
//     // const ctx = canvas.getContext("2d");

//     img.onload = () => {
//       if (
//         img.width > AVATAR_VALIDATION.MAX_DIMENSIONS.width ||
//         img.height > AVATAR_VALIDATION.MAX_DIMENSIONS.height
//       ) {
//         resolve({
//           valid: false,
//           error: `Dimensioni immagine troppo grandi. Massimo: ${AVATAR_VALIDATION.MAX_DIMENSIONS.width}x${AVATAR_VALIDATION.MAX_DIMENSIONS.height}px`,
//         });
//       } else {
//         resolve({ valid: true });
//       }
//     };

//     img.onerror = () => {
//       resolve({ valid: false, error: "Impossibile leggere l'immagine" });
//     };

//     img.src = URL.createObjectURL(file);
//   });
// }
