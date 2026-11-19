import { MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts';

function KpiRow({ data }) {
  const totalRetraso = data.reduce((acc, item) => acc + item.retrasoHoras, 0);
  const totalToneladas = data.reduce(
    (acc, item) => acc + item.toneladasProducidas,
    0
  );
  const totalMeta = data.reduce((acc, item) => acc + item.metaToneladas, 0);
  const totalHectareas = data.reduce(
    (acc, item) => acc + item.hectareasCosechadas,
    0
  );

  const promedioEficiencia =
    data.length === 0
      ? 0
      : data.reduce((acc, item) => acc + item.eficienciaDistribucionPct, 0) /
        data.length;

  const cumplimientoPct =
    totalMeta === 0 ? 0 : ((totalToneladas / totalMeta) * 100).toFixed(1);

  // Agrupamos por mes para que los sparklines dibujen una tendencia limpia de 6 puntos
  const monthlyMap = data.reduce((acc, item) => {
    if (!acc[item.fecha]) {
      acc[item.fecha] = {
        fecha: item.fecha,
        retraso: 0,
        toneladas: 0,
        hectareas: 0,
        eficienciaSum: 0,
        count: 0,
      };
    }
    acc[item.fecha].retraso += item.retrasoHoras;
    acc[item.fecha].toneladas += item.toneladasProducidas;
    acc[item.fecha].hectareas += item.hectareasCosechadas;
    acc[item.fecha].eficienciaSum += item.eficienciaDistribucionPct;
    acc[item.fecha].count += 1;
    return acc;
  }, {});

  const sparklineData = Object.values(monthlyMap)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .map((m) => ({
      fecha: m.fecha.slice(0, 7),
      retraso: Number(m.retraso.toFixed(2)),
      toneladas: m.toneladas,
      hectareas: m.hectareas,
      eficiencia: Number((m.eficienciaSum / m.count).toFixed(1)),
    }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Tarjeta 1: Retraso en Horas (Índigo) */}
      <div className="bg-indigo-600 rounded-lg p-5 text-white shadow-xs flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {totalRetraso.toFixed(2)} hrs
              </span>
              <span className="text-xs text-indigo-200 flex items-center">
                (Logística <ArrowDownRight className="w-3.5 h-3.5" />)
              </span>
            </div>
            <p className="text-sm text-indigo-100 mt-0.5">
              Suma de Retraso en Ruta
            </p>
          </div>
          <MoreVertical className="w-4 h-4 text-indigo-200 shrink-0" />
        </div>

        <div className="h-14 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1b4b',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="retraso"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth={2}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-sky-500 rounded-lg p-5 text-white shadow-xs flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {totalToneladas.toLocaleString('es-HN')} t
              </span>
              <span className="text-xs text-sky-100 flex items-center">
                ({cumplimientoPct}% meta <ArrowUpRight className="w-3.5 h-3.5" />)
              </span>
            </div>
            <p className="text-sm text-sky-100 mt-0.5">
              Toneladas Producidas
            </p>
          </div>
          <MoreVertical className="w-4 h-4 text-sky-100 shrink-0" />
        </div>

        <div className="h-14 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c4a6e',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Area
                type="linear"
                dataKey="toneladas"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={2}
                fill="transparent"
                dot={{ r: 2.5, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-amber-500 rounded-lg p-5 text-white shadow-xs flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {totalHectareas.toLocaleString('es-HN')} ha
              </span>
              <span className="text-xs text-amber-100">
                ({data.length} lotes)
              </span>
            </div>
            <p className="text-sm text-amber-100 mt-0.5">
              Hectáreas Cosechadas
            </p>
          </div>
          <MoreVertical className="w-4 h-4 text-amber-100 shrink-0" />
        </div>

        <div className="h-14 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#78350f',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="hectareas"
                stroke="#ffffff"
                strokeWidth={2}
                fill="rgba(255,255,255,0.25)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-rose-500 rounded-lg p-5 text-white shadow-xs flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {promedioEficiencia.toFixed(2)}%
              </span>
              <span className="text-xs text-rose-100 flex items-center">
                (Promedio <ArrowUpRight className="w-3.5 h-3.5" />)
              </span>
            </div>
            <p className="text-sm text-rose-100 mt-0.5">
              Eficiencia de Distribución
            </p>
          </div>
          <MoreVertical className="w-4 h-4 text-rose-100 shrink-0" />
        </div>

        <div className="h-14 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sparklineData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#881337',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Bar
                dataKey="eficiencia"
                fill="rgba(255,255,255,0.4)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default KpiRow;