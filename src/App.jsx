import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import DashboardView from './pages/DashboardView'

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768)
  const [activePage, setActivePage] = useState('dashboard')

   const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-800">
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}
      <Sidebar isOpen={isSidebarOpen} activePage={activePage} onSelectPage={setActivePage} onToggleSidebar={toggleSidebar}></Sidebar>
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <Navbar onToggleSidebar={toggleSidebar} activePage={activePage}></Navbar>
        <main className="p-4 md:p-4 flex-1" >
          {activePage === 'dashboard' ? <DashboardView/> : <div>PROXIMAMENTE....</div>}
        </main>
      </div>

    </div>
  )
}

export default App
