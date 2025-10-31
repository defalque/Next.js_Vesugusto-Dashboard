"use client";

import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import { AnimatePresence, MotionConfig } from "motion/react";
import * as m from "motion/react-m";

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
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <div className="dark:text-light mt-5 flex w-full flex-col gap-3 px-5 text-sm text-neutral-700 sm:px-10">
        <div className="flex items-center justify-between gap-8">
          <div className="space-x-2">
            <span className="font-medium">Email:</span>
            <span ref={emailRef} aria-readonly>
              copomi9452@dekpal.com
            </span>
          </div>
          <button
            type="button"
            title={isEmailCopied ? "Email copiata" : "Copia email"}
            aria-label={isEmailCopied ? "Email copiata" : "Copia email"}
            className="touch-hitbox ml-auto cursor-pointer rounded border border-gray-300 bg-white p-1 transition-all duration-200 hover:bg-gray-100 active:scale-96 active:bg-gray-100 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
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
                  <CheckIcon
                    aria-hidden
                    className="dark:text-light size-5 text-neutral-700"
                  />
                </m.span>
              ) : (
                <m.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Square2StackIcon
                    aria-hidden
                    className="dark:text-light size-5 text-neutral-700"
                  />
                </m.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="space-x-2">
            <span className="font-medium">Password:</span>
            <span ref={pwdRef} aria-readonly>
              1234567890
            </span>
          </div>
          <button
            type="button"
            title={isPasswordCopied ? "Password copiata" : "Copia password"}
            aria-label={
              isPasswordCopied ? "Password copiata" : "Copia password"
            }
            className="touch-hitbox ml-auto block cursor-pointer rounded border border-gray-300 bg-white p-1 transition-all duration-200 hover:bg-gray-100 active:scale-96 active:bg-gray-100 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
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
                  <CheckIcon
                    aria-hidden
                    className="dark:text-light size-5 text-neutral-700"
                  />
                </m.span>
              ) : (
                <m.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                >
                  <Square2StackIcon
                    aria-hidden
                    className="dark:text-light size-5 text-neutral-700"
                  />
                </m.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}

export default LoginInstructions;
