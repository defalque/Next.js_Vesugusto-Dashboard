import { notoSerif } from "@/app/_lib/fonts";

function Logo({ size, py }: { size?: string; py?: string }) {
  return (
    <div className={`${notoSerif.className} ${py}`}>
      <span
        className={`text-brand-950 w-full font-extrabold tracking-wide text-shadow-2xs ${size ? `xs:text-4xl text-3xl md:text-${size}` : "text-2xl sm:text-3xl"} dark:text-white`}
        aria-hidden="true"
      >
        Vesugusto
      </span>
    </div>
  );
}

export default Logo;
