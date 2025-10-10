import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function UserAvatar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const fullName = data?.user?.user_metadata?.fullName ?? "Il tuo profilo";
  const avatar = data?.user?.user_metadata?.avatar ?? "";

  return (
    <div className="text-grey-600 flex items-center gap-3 text-sm font-medium">
      <Image
        width={42}
        height={42}
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block aspect-square w-9 rounded-full object-cover outline-2 dark:bg-zinc-800"
      />
      <span className="font-semibold">{fullName || "Il tuo profilo"}</span>
    </div>
  );
}

export default UserAvatar;
