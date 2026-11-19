import {Sprout , Gauge, Table, ChevronLeft} from "lucide-react";

function Sidebar({isOpen, activePage, onSelectPage, onToggleSidebar}){

    function handleNavigation(page){
        onSelectPage(page)
        if(window.innerWidth < 768){
            onToggleSidebar()
        }
    }
    return(
        <aside className= {`fixed inset-y-0 left-0 z-40 md:static flex flex-col justify-between shrink-0 bg-[#2f353a] text-slate-300 transition-all duration-300 ${ isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-0 md:overflow-hidden" }`}>
            <div className= "h-14 bg-black/20 px-4 flex items-center gap-3 shrink-0">
                <Sprout className="text-emerald-400 w-6 h-6 shrink-0"/>
                <span className="text-lg font-bold text-white tracking-wider whitespace-nowrap">AGRO-BI</span>
            </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
            <button type="button" onClick={() => handleNavigation("dashboard")} className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${activePage === "dashboard" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <div className="flex items-center gap-3">
                    <Gauge className="w-4 h-4 shrink-0"/>
                    <span>Dashboard</span>
                </div>
                <span className="bg-sky-500 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">LIVE</span>
            </button>
            
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-5 pb-2">MÓDULOS</p>

            <button type="button" onClick={() => handleNavigation("tabla")} className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${activePage === "tabla" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <div className="flex items-center gap-3">
                    <Table className="w-4 h-4 shrink-0"/>
                    <span>Explorador de Datos</span>
                </div>
            </button>


        </nav>
        <button type="button" onClick={onToggleSidebar} className="h-11 bg-black/20 border-t border-white/10 flex items-center justify-end px-4 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5"/>
        </button>
        </aside>


    )

}

export default Sidebar