"use client";

import {
  CheckCircleIcon,
  CheckIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function LoginInstructions() {
  const emailRef = useRef<HTMLSpanElement>(null);
  const pwdRef = useRef<HTMLSpanElement>(null);

  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(
    null,
  );

  const isEmailCopied = copiedField === "email";
  const isPasswordCopied = copiedField === "password";

  const copy = async (
    curRef: React.RefObject<HTMLSpanElement | null>,
    field: "email" | "password",
  ) => {
    if (!curRef.current) return;

    const text = curRef.current.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);

      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
        <div className="mx-auto mt-5 flex w-fit flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-medium">Email:</span>
            <span
              ref={emailRef}
              className="font-medium text-neutral-600 dark:text-neutral-300"
              aria-readonly
            >
              copomi9452@dekpal.com
            </span>
            <button
              type="button"
              title={isEmailCopied ? "Email copiata" : "Copia email"}
              aria-label={isEmailCopied ? "Email copiata" : "Copia email"}
              className="touch-hitbox ml-auto cursor-pointer rounded border border-gray-300 p-1 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-100 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
              disabled={isEmailCopied}
              onClick={() => copy(emailRef, "email")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isEmailCopied ? (
                  <m.span
                    key="checkmark"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <CheckIcon aria-hidden className="size-5" />
                  </m.span>
                ) : (
                  <m.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Square2StackIcon aria-hidden className="size-5" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">Password:</span>
            <span
              ref={pwdRef}
              className="font-medium text-neutral-600 dark:text-neutral-300"
              aria-readonly
            >
              1234567890
            </span>
            <button
              type="button"
              title={isPasswordCopied ? "Password copiata" : "Copia password"}
              aria-label={
                isPasswordCopied ? "Password copiata" : "Copia password"
              }
              className="touch-hitbox ml-auto block cursor-pointer rounded border border-gray-300 p-1 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-100 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
              disabled={isPasswordCopied}
              onClick={() => copy(pwdRef, "password")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPasswordCopied ? (
                  <m.span
                    key="checkmark"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                  >
                    <CheckIcon aria-hidden className="size-5" />
                  </m.span>
                ) : (
                  <m.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                  >
                    <Square2StackIcon aria-hidden className="size-5" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default LoginInstructions;
