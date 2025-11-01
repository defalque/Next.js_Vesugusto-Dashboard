"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_SRC = "/fallback.png"; // <-- Path alla tua immagine di fallback

function SafeImage(props: ImageProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc(FALLBACK_SRC)}
      alt={props.alt || "Immagine di default"}
    />
  );
}

export default SafeImage;
