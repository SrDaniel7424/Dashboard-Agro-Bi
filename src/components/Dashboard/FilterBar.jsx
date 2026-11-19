import { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import {
  departamentosUnicos,
  cultivosUnicos,
  ciclosUnicos,
} from '../../data/mocks';

function FilterBar({
  filters,
  onToggleFilter,
  onClearFilters,
  totalCount,
  filteredCount,
}) {
  const [isDeptoOpen, setIsDeptoOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDeptoOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    filters.departamentos.length > 0 ||
    filters.cultivos.length > 0 ||
    filters.ciclos.length > 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filtros:</span>
        </div>

        
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDeptoOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
              filters.departamentos.length > 0
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>
              {filters.departamentos.length === 0
                ? 'Departamentos: Todos'
                : `Departamentos (${filters.departamentos.length})`}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isDeptoOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-20 max-h-64 overflow-y-auto">
              {departamentosUnicos.map((depto) => {
                const isChecked = filters.departamentos.includes(depto);
                return (
                  <label
                    key={depto}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded hover:bg-slate-100 cursor-pointer text-xs text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleFilter('departamentos', depto)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{depto}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="hidden sm:block h-5 w-px bg-slate-200" />

        {/* Pills de Cultivo */}
        <div className="flex flex-wrap items-center gap-1.5">
          {cultivosUnicos.map((cultivo) => {
            const isSelected = filters.cultivos.includes(cultivo);
            return (
              <button
                key={cultivo}
                type="button"
                onClick={() => onToggleFilter('cultivos', cultivo)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cultivo}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:block h-5 w-px bg-slate-200" />

        {/* Pills de Ciclo */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ciclosUnicos.map((ciclo) => {
            const isSelected = filters.ciclos.includes(ciclo);
            return (
              <button
                key={ciclo}
                type="button"
                onClick={() => onToggleFilter('ciclos', ciclo)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ciclo}
              </button>
            );
          })}
        </div>

        {/* Botón Limpiar */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      <div className="text-xs text-slate-500 shrink-0">
        Mostrando <span className="font-semibold text-slate-800">{filteredCount}</span> de{' '}
        <span className="font-semibold text-slate-800">{totalCount}</span> registros
      </div>
    </div>
  );
}

export default FilterBar;