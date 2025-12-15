import { HiOutlineExclamationCircle } from "react-icons/hi2";

type FormErrorProps = {
  message?: string;
};

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex max-w-sm items-start gap-2 rounded-lg bg-red-400/10 p-2 text-sm text-red-500 dark:bg-red-600/10 dark:text-red-500"
    >
      <HiOutlineExclamationCircle className="size-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
