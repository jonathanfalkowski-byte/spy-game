import { useEffect, useRef, type ReactNode } from 'react';
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      aria-labelledby="dialog-title"
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        const controls = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex="0"]',
          ),
        ).filter((el) => el.getClientRects().length > 0);
        const first = controls[0],
          last = controls[controls.length - 1];
        if (!first) {
          e.preventDefault();
          e.currentTarget.focus();
        } else if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === e.currentTarget)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-heading">
        <h2 id="dialog-title">{title}</h2>
        <button onClick={onClose} aria-label="Close dialog">
          Close ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
