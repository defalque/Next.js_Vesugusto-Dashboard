import getCurrentUser from "@/app/_lib/helpers";
import Button from "./Button";

async function WelcomeButton() {
  const { data } = await getCurrentUser();

  const user = data?.user;

  return (
    <Button
      href={user ? "/dashboard" : "/login"}
      className="self-center px-4 py-1 text-lg sm:self-start lg:self-end"
    >
      {user ? <span>Vai al tuo account</span> : <span>Accedi</span>}
    </Button>
  );
}

export default WelcomeButton;
