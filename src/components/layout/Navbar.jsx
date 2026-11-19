import {Menu, Bell, ListChecks, Mail} from "lucide-react";


function Navbar({onToggleSidebar, activePage}){

    const pageTitles = {
        dashboard: "Dashboard",
        tabla: "Explorador de Datos"
    }
    
    const currentTitle = pageTitles[activePage] || "dashboard"
    return(
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="h-14 px-4 md:px-6 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-6">
                    <button type="button" onClick={onToggleSidebar} className="text-slate-500 hover:text-slate-800 cursor-pointer">
                        <Menu className="w-5 h-5"/>
                    </button>
                    
                        <nav className="hidden md:flex items-center gap-5 text-sm text-slate-600">
                            <span>Dashboard</span> <span>Rendimiento</span> <span>Logistica</span>
                        </nav>
                </div>
                    <div className="flex items-center gap-4 text-slate-500">
                        <Bell className="w-4 h-4 sm:block"/>
                        <ListChecks className="w-4 h-4 sm:block"/>
                        <Mail className="w-4 h-4 sm:block"/>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">AD</div>
                    </div>
                
            </div>
            <div className="px-4 md:px-6 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-indigo-600">Inicio</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-500">{currentTitle}</span>
                </div>
                <span className="text-slate-400">Ciclos A y B • 2026</span>
            </div>
        </header>
    )
}

export default Navbar