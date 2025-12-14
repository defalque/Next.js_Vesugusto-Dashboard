"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("@/app/_lib/features").then((res) => res.default);

function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.25 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

export default MotionWrapper;
