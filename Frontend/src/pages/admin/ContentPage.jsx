export function ContentPage({ title, description }) {
  return (
    <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/30">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Administrator module</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-400">{description}</p>
      <div className="mt-8 rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6 text-sm text-slate-300">
        This section is ready for the next backend integration step and will connect to your Spring Boot APIs.
      </div>
    </div>
  )
}
