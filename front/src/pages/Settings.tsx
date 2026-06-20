import { useTranslation } from 'react-i18next'
import { Sun, Moon, Languages } from 'lucide-react'
import { useThemeStore } from '../stores/useThemeStore'
import { useLanguageStore } from '../stores/useLanguageStore'
import i18n from '../i18n'

export default function Settings() {
  const { t } = useTranslation()
  const { theme, setTheme } = useThemeStore()
  const { lang, setLang } = useLanguageStore()

  const handleLangChange = (newLang: 'zh-CN' | 'en-US') => {
    setLang(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)] mb-8">{t('settings.title')}</h1>

      <div className="space-y-6">
        <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 space-y-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? <Sun size={18} className="text-[var(--color-text-secondary)]" /> : <Moon size={18} className="text-[var(--color-text-secondary)]" />}
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">{t('settings.theme')}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{t(theme === 'light' ? 'settings.light' : 'settings.dark')}</p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-bg-tertiary)]'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 space-y-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Languages size={18} className="text-[var(--color-text-secondary)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">{t('settings.language')}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{lang === 'zh-CN' ? '中文' : 'English'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleLangChange('zh-CN')}
                className={`px-3 py-1.5 text-xs rounded-full border border-[var(--color-border)] transition-all ${lang === 'zh-CN' ? 'bg-[var(--color-text)] text-[var(--color-card)] shadow-[var(--shadow-card)]' : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-card)]'}`}
              >
                中文
              </button>
              <button
                onClick={() => handleLangChange('en-US')}
                className={`px-3 py-1.5 text-xs rounded-full border border-[var(--color-border)] transition-all ${lang === 'en-US' ? 'bg-[var(--color-text)] text-[var(--color-card)] shadow-[var(--shadow-card)]' : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-card)]'}`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
