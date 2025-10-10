"use client";

import { ReactNode } from "react";
import { LazyMotion, AnimatePresence } from "motion/react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

export default function ItemsListMotionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </LazyMotion>
  );
}
