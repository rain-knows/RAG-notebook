import { Trash2, Download, FolderTree, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BatchActionBarProps {
  selectedCount: number
  onDelete: () => void
  onDownload: () => void
  onCategory: () => void
  onCancel: () => void
}

export default function BatchActionBar({
  selectedCount,
  onDelete,
  onDownload,
  onCategory,
  onCancel,
}: BatchActionBarProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] mb-3">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
      >
        <X size={14} />
        {t('note.batch.cancel')}
      </button>

      <div className="flex-1 text-center">
        <span className="text-sm font-medium text-[var(--color-accent)]">
          {t('note.batch.selected', { count: selectedCount })}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-card)] transition-all"
        >
          <FolderTree size={14} />
          {t('note.category')}
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-card)] transition-all"
        >
          <Download size={14} />
          {t('note.download')}
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-[var(--color-danger-bg)] text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] transition-colors"
        >
          <Trash2 size={14} />
          {t('note.delete')}
        </button>
      </div>
    </div>
  )
}
