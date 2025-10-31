import { notoSerif } from "@/app/_lib/fonts";

function Logo() {
  return (
    <div className={`${notoSerif.className} py-10`}>
      <span
        className={`text-brand-950 w-full text-2xl font-extrabold tracking-wide text-shadow-2xs sm:text-3xl dark:text-white`}
        aria-hidden="true"
      >
        Vesugusto
      </span>
    </div>
  );
}

export default Logo;
