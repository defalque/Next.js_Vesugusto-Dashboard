"use client";

import { useState } from "react";

import useMeasure from "react-use-measure";

import LazyLoginCredentialsForm from "./LazyLoginCredentialsForm";
import LazySignupCredentialsForm from "./LazySignupCredentialsForm";

import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

export default function AuthForms() {
  const [form, setForm] = useState<"login" | "signup">("login");
  const [ref, bounds] = useMeasure();

  const variants = {
    initial: { x: form === "login" ? "-110%" : "110%", opacity: 0, scale: 0.9 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: form === "login" ? "-110%" : "110%", opacity: 0, scale: 0.9 },
  };

  return (
    <div className="box-style bg-box dark:text-light w-full gap-1 overflow-hidden rounded-md border text-neutral-700 shadow-lg sm:w-110">
      <LazyMotion features={loadFeatures}>
        <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
          <m.div animate={{ height: bounds.height }}>
            <div ref={ref} className="relative">
              <div className="box-style relative overflow-hidden border-b">
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.p
                    className="p-3 text-center text-2xl/9 font-bold tracking-tight"
                    key={form}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {form === "login" ? (
                      <span>Accedi alla dashboard</span>
                    ) : (
                      <span>Registrati alla dashboard</span>
                    )}
                  </m.p>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={form}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
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
          {/* </AnimatePresence> */}
        </MotionConfig>
      </LazyMotion>
    </div>
  );
}
