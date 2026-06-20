import { useEffect, useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
  onConfirm: () => void
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  variant = 'default',
  onConfirm,
}: ConfirmDialogProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => btnRef.current?.focus(), 50)
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[60]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-[var(--color-card)] rounded-xl shadow-[var(--shadow-float)] border border-[var(--color-border)] p-6 w-[400px] max-w-[90vw]">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-base font-medium text-[var(--color-text)]">
              {title}
            </Dialog.Title>
            <Dialog.Close className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text)]">
              <X size={16} />
            </Dialog.Close>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            {message}
          </p>
          <div className="flex justify-end gap-3">
            <Dialog.Close className="px-4 py-2 text-sm rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-card)] transition-all">
              {cancelText}
            </Dialog.Close>
            <button
              ref={btnRef}
              onClick={() => {
                onConfirm()
                onOpenChange(false)
              }}
              className={`px-4 py-2 text-sm rounded-full transition-colors shadow-[var(--shadow-card)] ${
                variant === 'danger'
                  ? 'bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)]'
                  : 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
