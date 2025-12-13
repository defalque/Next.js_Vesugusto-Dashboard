"use client";

import { Drawer } from "vaul";

function RemoveImagesDrawer({ isOpen }: { isOpen: boolean }) {
  return (
    <Drawer.Root modal={false} open={isOpen}>
      {/* <Drawer.Portal> */}
      {/* <Drawer.Overlay onClick={() => setIsOpen(false)} /> */}
      <Drawer.Title>Rimuovi immagini</Drawer.Title>
      <Drawer.Content className="fixed inset-x-4 bottom-4 z-10 mx-auto h-15 max-w-2xs overflow-hidden rounded-[36px] border border-gray-200 bg-[#FEFFFE] outline-none md:mx-auto md:w-full">
        <div className="bg-white p-4">{/* Content */}</div>
      </Drawer.Content>
      {/* </Drawer.Portal> */}
    </Drawer.Root>
  );
}

export default RemoveImagesDrawer;
