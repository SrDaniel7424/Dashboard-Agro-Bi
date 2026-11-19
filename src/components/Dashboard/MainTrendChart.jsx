import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const monthLabels = {
  '2026-05-01': 'Mayo',
  '2026-06-01': 'Junio',
  '2026-07-01': 'Julio',
  '2026-08-01': 'Agosto',
  '2026-09-01': 'Septiembre',
  '2026-10-01': 'Octubre',
};

function MainTrendChart({ data }) {
  const groupedByMonth = data.reduce((acc, item) => {
    if (!acc[item.fecha]) {
      acc[item.fecha] = {
        fecha: item.fecha,
        mes: monthLabels[item.fecha] || item.fecha,
        producidas: 0,
        meta: 0,
      };
    }
    acc[item.fecha].producidas += item.toneladasProducidas;
    acc[item.fecha].meta += item.metaToneladas;
    return acc;
  }, {});

  const chartData = Object.values(groupedByMonth).sort((a, b) =>
    a.fecha.localeCompare(b.fecha)
  );

  const totalProd = data.reduce((acc, i) => acc + i.toneladasProducidas, 0);
  const totalMeta = data.reduce((acc, i) => acc + i.metaToneladas, 0);
  const avgMargen =
    data.length === 0
      ? 0
      : data.reduce((acc, i) => acc + i.margenOperativoPct, 0) / data.length;

  const cumplimientoMeta =
    totalMeta === 0 ? 0 : Math.min((totalProd / totalMeta) * 100, 100);

  const prodPorCultivo = (nombre) =>
    data
      .filter((i) => i.cultivo === nombre)
      .reduce((acc, i) => acc + i.toneladasProducidas, 0);

  const maizTons = prodPorCultivo('Maíz');
  const cafeTons = prodPorCultivo('Café');
  const frijolTons = prodPorCultivo('Frijol');

  const pctDeTotal = (val) =>
    totalProd === 0 ? 0 : Number(((val / totalProd) * 100).toFixed(1));

  const bottomStats = [
    {
      label: 'Margen Operativo',
      valueText: `${avgMargen.toFixed(1)}% promedio`,
      pct: Math.min(avgMargen * 3, 100),
      barColor: 'bg-emerald-500',
    },
    {
      label: 'Cumplimiento Meta',
      valueText: `${totalProd.toLocaleString('es-HN')} t (${cumplimientoMeta.toFixed(0)}%)`,
      pct: cumplimientoMeta,
      barColor: 'bg-sky-500',
    },
    {
      label: 'Volumen Maíz',
      valueText: `${maizTons.toLocaleString('es-HN')} t (${pctDeTotal(maizTons)}%)`,
      pct: pctDeTotal(maizTons),
      barColor: 'bg-amber-500',
    },
    {
      label: 'Volumen Café',
      valueText: `${cafeTons.toLocaleString('es-HN')} t (${pctDeTotal(cafeTons)}%)`,
      pct: pctDeTotal(cafeTons),
      barColor: 'bg-rose-500',
    },
    {
      label: 'Volumen Frijol',
      valueText: `${frijolTons.toLocaleString('es-HN')} t (${pctDeTotal(frijolTons)}%)`,
      pct: pctDeTotal(frijolTons),
      barColor: 'bg-indigo-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Producción Mensual vs. Meta Proyectada
          </h2>
          <p className="text-xs text-slate-400">
            Consolidado en toneladas métricas • Mayo - Octubre 2026
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
            <span>Toneladas Producidas</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span>Meta Toneladas</span>
          </div>
        </div>
      </div>

      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">
            No hay registros para la combinación de filtros seleccionada.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="producidas"
                name="Toneladas Producidas"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                fill="#0ea5e9"
                fillOpacity={0.12}
              />
              <Area
                type="monotone"
                dataKey="meta"
                name="Meta Toneladas"
                stroke="#22c55e"
                strokeWidth={2.5}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 mt-6 border-t border-slate-200">
        {bottomStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            <p className="text-sm font-bold text-slate-700 mt-0.5">
              {stat.valueText}
            </p>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${stat.barColor}`}
                style={{ width: `${stat.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainTrendChart;