import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="fixed inset-x-0 top-0 h-2 pointer-events-none bg-[linear-gradient(90deg,var(--color-accent),var(--color-timeline-thinking),var(--color-timeline-grep),var(--color-timeline-read),var(--color-timeline-edit),var(--color-timeline-done))]" />
      <div className="relative w-full max-w-md mx-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-float)]">
        <Outlet />
      </div>
    </div>
  )
}
