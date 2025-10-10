import Button from "../Button";

function FormButtons({
  isSubmitting,
  defaultText,
  pendingText,
  hasChanged,
  isDirty,
  onClick,
}: {
  isSubmitting: boolean;
  defaultText: string;
  pendingText: string;
  hasChanged?: () => boolean;
  isDirty?: boolean;
  onClick?: () => void;
}) {
  // const isFormChanged = hasChanged?.() ?? isDirty;
  const isFormChanged = hasChanged ? hasChanged() : isDirty;

  return (
    <div className="mt-8 flex justify-end gap-2">
      <button
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-transparent dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
        type="button"
        disabled={isSubmitting || !isFormChanged}
        onClick={onClick}
      >
        Cancella modifiche
      </button>

      <Button
        type="submit"
        className="px-4"
        disabled={isSubmitting || !isFormChanged}
      >
        {isSubmitting ? pendingText : defaultText}
      </Button>
    </div>
  );
}

export default FormButtons;
