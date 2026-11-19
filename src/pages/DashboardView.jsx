import { useState } from 'react';
import { agricolaData } from '../data/mocks';
import FilterBar from '../components/Dashboard/FilterBar';
import KpiRow from '../components/Dashboard/KpiRow';
import MainTrendChart from '../components/Dashboard/MainTrendChart';
import BottomBreakdown from '../components/Dashboard/BottomBreakdown';

function DashboardView() {
  const [filters, setFilters] = useState({
    departamentos: [],
    cultivos: [],
    ciclos: [],
  });

  function toggleFilter(categoria, valor) {
    setFilters((prev) => {
      const exists = prev[categoria].includes(valor);
      return {
        ...prev,
        [categoria]: exists
          ? prev[categoria].filter((item) => item !== valor)
          : [...prev[categoria], valor],
      };
    });
  }

  function clearFilters() {
    setFilters({
      departamentos: [],
      cultivos: [],
      ciclos: [],
    });
  }

  const filteredData = agricolaData.filter((item) => {
    const matchDepto =
      filters.departamentos.length === 0 ||
      filters.departamentos.includes(item.departamento);
    const matchCultivo =
      filters.cultivos.length === 0 ||
      filters.cultivos.includes(item.cultivo);
    const matchCiclo =
      filters.ciclos.length === 0 || filters.ciclos.includes(item.ciclo);

    return matchDepto && matchCultivo && matchCiclo;
  });

  return (
    <div className="space-y-6">
      <FilterBar
        filters={filters}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
        totalCount={agricolaData.length}
        filteredCount={filteredData.length}
      />
      <KpiRow data={filteredData} />
      <MainTrendChart data={filteredData} />
      <BottomBreakdown data={filteredData} />
    </div>
  );
}

export default DashboardView;