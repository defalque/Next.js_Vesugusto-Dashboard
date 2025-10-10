import { ReactNode } from "react";

function FormHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-2xl/9 font-bold tracking-tight">
      {children}
    </p>
  );
}

export default FormHeading;
