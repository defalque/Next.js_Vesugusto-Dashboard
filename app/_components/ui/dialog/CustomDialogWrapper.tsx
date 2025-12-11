"use client";

import dynamic from "next/dynamic";
const CustomDialog = dynamic(() => import("./CustomDialog"), {
  ssr: false,
});

function CustomDialogWrapper({
  afterAction,
  setIsPending,
  isPending,
}: {
  afterAction?: () => void;
  setIsPending?: (isPending: boolean) => void;
  isPending?: boolean;
}) {
  return (
    <CustomDialog
      afterAction={afterAction}
      setIsPending={setIsPending}
      isPending={isPending}
    />
  );
}

export default CustomDialogWrapper;
