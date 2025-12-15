import getCurrentUser from "@/app/_lib/helpers";
import Image from "next/image";

async function UserAvatar() {
  const data = await getCurrentUser();

  const fullName = data?.user?.user_metadata?.fullName ?? "Il tuo profilo";
  const email = data?.user?.user_metadata?.email ?? "";
  const avatar = data?.user?.user_metadata?.avatar ?? "";

  return (
    <div className="text-grey-600 flex items-center gap-2 font-medium">
      <Image
        width={32}
        height={32}
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block aspect-square w-9 rounded-full object-cover outline-2"
      />
      <div className="hidden flex-col items-start xl:flex">
        <span className="text-sm font-semibold">
          {fullName || "Il tuo profilo"}
        </span>
        <span className="text-[0.6875rem]">{email}</span>
      </div>
    </div>
  );
}

export default UserAvatar;
