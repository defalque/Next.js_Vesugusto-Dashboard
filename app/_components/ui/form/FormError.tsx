import { HiOutlineExclamationCircle } from "react-icons/hi2";

type FormErrorProps = {
  message?: string;
};

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="bg-brand-950/10 text-brand-950 flex max-w-sm items-start gap-2 rounded-lg p-2 text-sm dark:bg-red-600/20 dark:text-red-500"
    >
      <HiOutlineExclamationCircle className="size-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
