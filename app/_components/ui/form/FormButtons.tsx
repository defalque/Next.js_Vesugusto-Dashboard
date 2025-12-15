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
    <div className="mt-2 flex justify-end gap-2">
      <button
        className="touch-hitbox inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-50 bg-gray-50 px-4 py-2.5 text-base font-semibold text-gray-500 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50 disabled:hover:bg-transparent sm:text-[15px] md:text-sm dark:border-zinc-950/0 dark:bg-zinc-950/25 dark:text-gray-200 dark:hover:bg-zinc-950/50"
        type="button"
        disabled={isSubmitting || !isFormChanged}
        onClick={onClick}
      >
        Cancella modifiche
      </button>

      <button
        type="submit"
        className="bg-brand-950 hover:bg-brand-900 touch-hitbox border-brand-950 disabled:hover:bg-brand-950 flex cursor-pointer items-center rounded-lg border px-3 py-2.5 text-base font-semibold text-white shadow-sm inset-shadow-2xs transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:inset-shadow-none sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90 disabled:hover:dark:bg-zinc-700/80"
        disabled={isSubmitting || !isFormChanged}
      >
        {isSubmitting ? pendingText : defaultText}
      </button>
    </div>
  );
}

export default FormButtons;
