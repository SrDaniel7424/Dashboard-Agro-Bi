import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function BottomBreakdown({ data }) {
  const cultivoMap = data.reduce((acc, item) => {
    if (!acc[item.cultivo]) {
      acc[item.cultivo] = { cultivo: item.cultivo, toneladas: 0 };
    }
    acc[item.cultivo].toneladas += item.toneladasProducidas;
    return acc;
  }, {});

  const cultivoData = Object.values(cultivoMap).sort(
    (a, b) => b.toneladas - a.toneladas
  );

  const deptoMap = data.reduce((acc, item) => {
    if (!acc[item.departamento]) {
      acc[item.departamento] = { departamento: item.departamento, retraso: 0 };
    }
    acc[item.departamento].retraso += item.retrasoHoras;
    return acc;
  }, {});

  const deptoData = Object.values(deptoMap)
    .map((d) => ({
      departamento: d.departamento,
      retraso: Number(d.retraso.toFixed(2)),
    }))
    .sort((a, b) => b.retraso - a.retraso);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-800">
          Toneladas Producidas por Cultivo
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Comparativa acumulada según filtros activos
        </p>

        <div className="h-64 w-full">
          {cultivoData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              Sin datos disponibles
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cultivoData}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="cultivo"
                  tick={{ fontSize: 12, fill: '#475569' }}
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
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="toneladas"
                  name="Toneladas"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-800">
          Suma de Retraso (Horas) por Departamento
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Detección de cuellos de botella en rutas de distribución
        </p>

        <div className="h-64 w-full">
          {deptoData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              Sin datos disponibles
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deptoData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="departamento"
                  width={90}
                  tick={{ fontSize: 12, fill: '#475569' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="retraso"
                  name="Retraso (Horas)"
                  fill="#f97316"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default BottomBreakdown;