"use client";

import dynamic from "next/dynamic";
const CustomDialog = dynamic(() => import("./CustomDialog"), {
  ssr: false,
});

function CustomDialogWrapper() {
  return <CustomDialog />;
}

export default CustomDialogWrapper;
