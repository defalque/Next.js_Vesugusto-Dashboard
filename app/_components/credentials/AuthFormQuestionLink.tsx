import { AuthFormTitle } from "@/app/_lib/definitions";
import Link from "next/link";

function AuthFormQuestionLink({ title }: AuthFormTitle) {
  return (
    <span className="block text-center text-sm">
      {title === "Login" && "Non hai un account? "}
      {title === "Registrazione" && "Hai già un account? "}
      <Link
        className="text-brand-950 hover:text-brand-800 focus rounded px-0.5 font-medium"
        href={`${title === "Login" ? "signup" : "login"}`}
      >
        {title === "Login" && "Registrati"}
        {title === "Registrazione" && "Accedi"}
      </Link>
    </span>
  );
}

export default AuthFormQuestionLink;
