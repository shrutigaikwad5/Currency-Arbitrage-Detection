import { Globe2, Send, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Documentation', href: '#docs' },
  { label: 'GitHub', href: '#github' },
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200/70 bg-white/70 px-4 py-10 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <a href="#home" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">AX</span>
            <span>Arbitrage<span className="text-indigo-600 dark:text-indigo-400">X</span></span>
          </a>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">Enterprise-grade currency arbitrage intelligence for modern treasury teams, brokers, and financial institutions.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-slate-800/70 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ArbitrageX Technology Group</p>
        <div className="flex items-center gap-3">
          <a href="#github" className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-300">
            <Globe2 size={16} />
          </a>
          <a href="#linkedin" className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-300">
            <Send size={16} />
          </a>
          <a href="#contact" className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-300">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
