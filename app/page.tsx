import { Suspense } from "react";
import WelcomeButton from "./_components/ui/WelcomeButton";
import { WelcomeButtonSkeleton } from "./_components/ui/Skeletons";
import Image from "next/image";
import heroDesktop from "@/public/hero-desktop.png";
import heroMobile from "@/public/hero-mobile.png";

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-1 grid-rows-[1fr_2fr] bg-radial from-white to-gray-50 lg:grid-cols-[1.5fr_3fr] lg:grid-rows-1 dark:from-zinc-700 dark:to-zinc-900">
      <div className="mask-radial flex flex-col gap-8 px-5 pt-20 pb-5 sm:px-15 lg:py-40">
        <div className="dark:text-brand-50 space-y-5 text-center leading-relaxed text-zinc-900 sm:text-left">
          <p className="text-3xl font-bold text-shadow-xs sm:text-5xl dark:text-shadow-lg">
            Benvenuto su Vesugusto!
          </p>
          <p className="text-lg text-shadow-2xs dark:text-shadow-sm">
            La tua demo dashboard preferita.
          </p>
        </div>

        <Suspense fallback={<WelcomeButtonSkeleton />}>
          <WelcomeButton />
        </Suspense>
      </div>

      <div className="flex w-full items-center justify-center px-5 sm:px-10 lg:bg-gray-100 lg:dark:bg-linear-to-br lg:dark:from-zinc-600 lg:dark:to-zinc-800">
        <Image
          src={heroDesktop}
          alt="Screen della dashboard di Vesugusto su desktop."
          width={1000}
          height={760}
          quality={80}
          className="hidden sm:block"
          priority
          placeholder="blur"
        />
        <Image
          src={heroMobile}
          alt="Screen della dashboard di Vesugusto su mobile."
          width={500}
          height={560}
          quality={80}
          className="block sm:hidden"
          priority
          placeholder="blur"
        />
      </div>
    </main>
  );
}
