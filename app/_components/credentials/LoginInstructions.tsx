"use client";

import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

function LoginInstructions() {
  const emailRef = useRef<HTMLSpanElement>(null);
  const pwdRef = useRef<HTMLSpanElement>(null);

  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(
    null,
  );

  const copy = async (
    curRef: React.RefObject<HTMLSpanElement | null>,
    field: "email" | "password",
  ) => {
    if (!curRef.current) return;

    const text = curRef.current.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);

      // Reset "copied" state after 2 seconds
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="mx-auto mt-5 flex w-fit flex-col gap-1 text-sm">
      <div className="flex items-center gap-3">
        <span>Email:</span>
        <span ref={emailRef} className="font-medium" aria-readonly>
          copomi9452@dekpal.com
        </span>
        <button
          type="button"
          title={copiedField === "email" ? "Email copiata" : "Copia email"}
          aria-label={copiedField === "email" ? "Email copiata" : "Copia email"}
          className="cursor-pointer rounded p-1 transition-colors duration-200 hover:bg-gray-200 active:bg-gray-200 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:hover:bg-zinc-600 dark:active:bg-zinc-600"
          disabled={copiedField === "email"}
          onClick={() => copy(emailRef, "email")}
        >
          {copiedField === "email" ? (
            <CheckIcon
              aria-hidden
              className="size-5 text-green-600 dark:text-green-500"
            />
          ) : (
            <Square2StackIcon aria-hidden className="size-5" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span>Password:</span>
        <span ref={pwdRef} className="font-medium" aria-readonly>
          1234567890
        </span>
        <button
          type="button"
          title={
            copiedField === "password" ? "Password copiata" : "Copia password"
          }
          aria-label={
            copiedField === "password" ? "Password copiata" : "Copia password"
          }
          className="block cursor-pointer rounded p-1 transition-colors duration-200 hover:bg-gray-200 active:bg-gray-200 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:hover:bg-zinc-600 dark:active:bg-zinc-600"
          disabled={copiedField === "password"}
          onClick={() => copy(pwdRef, "password")}
        >
          {copiedField === "password" ? (
            <CheckIcon
              aria-hidden
              className="size-5 text-green-600 dark:text-green-500"
            />
          ) : (
            <Square2StackIcon aria-hidden className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginInstructions;
