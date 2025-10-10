import { logout } from "@/app/_lib/server-actions";
import Button from "../ui/Button";
import { PowerIcon } from "@heroicons/react/24/solid";

function Logout() {
  return (
    <form action={logout}>
      <Button className="inline-flex items-center gap-2 px-4">
        Esci
        <PowerIcon className="size-4" />
      </Button>
    </form>
  );
}

export default Logout;
