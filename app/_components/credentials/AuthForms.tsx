"use client";

import { useState } from "react";

import useMeasure from "react-use-measure";

import LazyLoginCredentialsForm from "./LazyLoginCredentialsForm";
import LazySignupCredentialsForm from "./LazySignupCredentialsForm";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export default function AuthForms() {
  const [form, setForm] = useState<"login" | "signup">("login");
  const [ref, bounds] = useMeasure();

  const variants = {
    initial: { x: form === "login" ? "-110%" : "110%", opacity: 0, scale: 0.9 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: form === "login" ? "-110%" : "110%", opacity: 0, scale: 0.9 },
  };

  const transition = { type: "spring" as const, bounce: 0, duration: 0.5 };

  return (
    <div className="box-style bg-box dark:text-light w-full gap-1 overflow-hidden rounded-md border text-neutral-700 shadow-xl/20 sm:w-110 dark:shadow-zinc-700">
      <m.div animate={{ height: bounds.height }}>
        <div ref={ref} className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={form}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              // transition={transition}
              transition={transition}
            >
              {form === "login" ? (
                <LazyLoginCredentialsForm
                  title="Login"
                  isActive={form === "login"}
                  onChangeForm={() => {
                    setForm("signup");
                  }}
                />
              ) : (
                <LazySignupCredentialsForm
                  title="Registrazione"
                  isActive={form === "signup"}
                  onChangeForm={() => {
                    setForm("login");
                  }}
                />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </m.div>
    </div>
  );
}
