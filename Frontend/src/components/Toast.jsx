import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export function Toast({ message, type, onClose }) {
  if (!message) return null

  const icon = type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />

  return (
    <div className={`flex items-center justify-between rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/70 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/70 dark:text-rose-300'}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button type="button" onClick={onClose} className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/10">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  )
}
