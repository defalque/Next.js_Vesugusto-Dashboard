import { useEffect, useRef, type RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  fn: () => void,
  listenCapturing = true,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) fn();
      }

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") fn();
      }

      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [fn, listenCapturing],
  );

  return ref;
}
