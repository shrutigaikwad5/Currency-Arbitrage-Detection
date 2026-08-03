import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopNavbar } from '../components/TopNavbar'

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_30%)] bg-slate-950 text-slate-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen ? (
        <button type="button" aria-label="Close sidebar" className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      ) : null}

      <div className="lg:ml-[280px]">
        <TopNavbar onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="min-h-[calc(100vh-73px)] overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
