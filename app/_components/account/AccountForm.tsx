import { ReactNode } from "react";

function AccountForm({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="dark:text-light flex flex-col gap-3 rounded text-neutral-700">
      <h5 className="box-style border-b py-3 text-xl font-semibold">{title}</h5>
      {children}
    </div>
  );
}

export default AccountForm;
