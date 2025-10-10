"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type State = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedImage: string;
};

const SelectedImageContext = createContext<State | null>(null);

function SelectedImageContextProvider({
  images,
  children,
}: {
  images: string[];
  children: ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex] || "";

  const value = {
    selectedIndex,
    setSelectedIndex,
    selectedImage,
  };
  return (
    <SelectedImageContext.Provider value={value}>
      {children}
    </SelectedImageContext.Provider>
  );
}

export default SelectedImageContextProvider;

export function useSelectedImage() {
  const context = useContext(SelectedImageContext);

  if (!context) {
    throw new Error(
      "useSelectedImage deve essere usato all'interno del suo provider!",
    );
  }

  return context;
}

// "use client";

// import { createContext, ReactNode, useContext, useState } from "react";

// type State = {
//   selectedImage: number;
//   setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
// };

// const SelectedImageContext = createContext<State | null>(null);

// function SelectedImageContextProvider({ children }: { children: ReactNode }) {
//   const [selectedImage, setSelectedImage] = useState(0);

//   const value = { selectedImage, setSelectedImage };
//   return (
//     <SelectedImageContext.Provider value={value}>
//       {children}
//     </SelectedImageContext.Provider>
//   );
// }

// export default SelectedImageContextProvider;

// export function useSelectedImage() {
//   const context = useContext(SelectedImageContext);

//   if (!context) {
//     throw new Error(
//       "useSelectedImage deve essere usato all'interno del suo provider!",
//     );
//   }

//   return context;
// }
