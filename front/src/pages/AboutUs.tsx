import { useTranslation } from 'react-i18next'
import { GitFork } from 'lucide-react'

export default function AboutUs() {
  const { t } = useTranslation()
  const techColors = [
    'var(--color-timeline-thinking)',
    'var(--color-timeline-read)',
    'var(--color-timeline-edit)',
    'var(--color-timeline-grep)',
    'var(--color-warning-bg)',
    'var(--color-link-bg)',
  ]

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)] mb-6">{t('about.title')}</h1>

      <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 space-y-6 shadow-[var(--shadow-card)]">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {t('about.description')}
        </p>

        <div>
          <h3 className="text-sm font-medium text-[var(--color-text)] mb-3">{t('about.techStack')}</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'FastAPI', 'LangChain', 'MySQL', 'Redis', 'ChromaDB'].map((tech, index) => (
              <span
                key={tech}
                style={{ backgroundColor: techColors[index % techColors.length] }}
                className="px-2.5 py-1 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-text)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[var(--color-text)] mb-3">{t('about.features')}</h3>
          <ul className="space-y-2">
            {['aiChat', 'noteTaking', 'knowledgeBase', 'review'].map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                {t(`about.featureList.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://github.com/rain-knows/RAG-notebook"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-link)] hover:underline"
        >
          <GitFork size={16} />
          {t('about.github')}
        </a>
      </div>
    </div>
  )
}
