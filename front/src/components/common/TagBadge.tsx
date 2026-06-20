interface TagBadgeProps {
  tag: string
  color?: string
  size?: 'sm' | 'md'
}

export default function TagBadge({ tag, color, size = 'sm' }: TagBadgeProps) {
  const palette = [
    ['var(--color-timeline-thinking)', 'var(--color-text)'],
    ['var(--color-timeline-grep)', 'var(--color-text)'],
    ['var(--color-timeline-read)', 'var(--color-text)'],
    ['var(--color-timeline-edit)', 'var(--color-text)'],
    ['var(--color-warning-bg)', 'var(--color-warning)'],
  ] as const
  const index = Math.abs([...tag].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % palette.length
  const [fallbackBg, fallbackText] = palette[index]

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border border-[var(--color-border)] ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      }`}
      style={{
        backgroundColor: color ? `${color}20` : fallbackBg,
        color: color || fallbackText,
      }}
    >
      {tag}
    </span>
  )
}
