"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface EhePillarDatum {
  pillar: string;
  treatments: number;
  publications: number;
}

interface EfficacyDatum {
  tier: string;
  count: number;
}

interface PopulationDatum {
  label: string;
  count: number;
}

interface LocationDatum {
  location: string;
  count: number;
}

interface DurationDatum {
  duration: string;
  count: number;
}

interface ExploreChartsProps {
  ehePillarData: EhePillarDatum[];
  efficacyData: EfficacyDatum[];
  populationThemes: PopulationDatum[];
  studyLocationData: LocationDatum[];
  durationData: DurationDatum[];
}

const PIE_COLORS = [
  "var(--color-primary-600)",
  "var(--color-primary-400)",
  "var(--color-accent-500)",
  "var(--color-tertiary-500)",
  "var(--color-shadow-500)",
  "var(--color-warm-500)",
];

const CHART_GRID = "var(--color-warm-200)";
const CHART_TICK = "var(--color-warm-600)";
const CHART_LABEL_LINE = "var(--color-warm-400)";

const tooltipStyle = {
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  fontSize: "0.8125rem",
};

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-warm-200 p-6">
      <h2 className="text-lg font-semibold text-warm-900 font-heading">
        {title}
      </h2>
      <p className="text-sm text-warm-500 mt-1 mb-6">{description}</p>
      {children}
    </div>
  );
}

export function ExploreCharts({
  ehePillarData,
  efficacyData,
  populationThemes,
  studyLocationData,
  durationData,
}: ExploreChartsProps) {
  return (
    <div className="grid gap-8">
      {/* EHE Pillar Distribution */}
      <ChartCard
        title="Ending the HIV Epidemic Pillars"
        description="How interventions and publications align with the four EHE strategic pillars. Interventions may address multiple pillars."
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ehePillarData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
              <XAxis
                dataKey="pillar"
                tick={{ fill: CHART_TICK, fontSize: 13 }}
              />
              <YAxis tick={{ fill: CHART_TICK, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "0.8125rem" }} />
              <Bar
                dataKey="treatments"
                name="Treatment Interventions"
                fill="var(--color-primary-700)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="publications"
                name="Prevention Publications"
                fill="var(--color-primary-300)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Efficacy Breakdown */}
        <ChartCard
          title="Efficacy Tiers"
          description="Distribution of treatment interventions across CDC efficacy rating categories."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={efficacyData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis type="number" tick={{ fill: CHART_TICK, fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="tier"
                  width={180}
                  tick={{ fill: CHART_TICK, fontSize: 11 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="count"
                  name="Interventions"
                  fill="var(--color-primary-600)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Population Themes */}
        <ChartCard
          title="Population Coverage"
          description="Intervention counts by population theme. Themes are derived from population descriptions."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={populationThemes}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis type="number" tick={{ fill: CHART_TICK, fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={200}
                  tick={{ fill: CHART_TICK, fontSize: 11 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="count"
                  name="Interventions"
                  fill="var(--color-primary-400)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Study Location */}
        <ChartCard
          title="Study Location"
          description="Where the evidence supporting these interventions was gathered."
        >
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studyLocationData}
                  dataKey="count"
                  nameKey="location"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ location, count }) => `${location} (${count})`}
                  labelLine={{ stroke: CHART_LABEL_LINE }}
                >
                  {studyLocationData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Duration */}
        <ChartCard
          title="Intervention Duration"
          description="Session format: single-session vs. multi-session programs."
        >
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={durationData}
                  dataKey="count"
                  nameKey="duration"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ duration, count }) => `${duration} (${count})`}
                  labelLine={{ stroke: CHART_LABEL_LINE }}
                >
                  {durationData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[(i + 2) % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
