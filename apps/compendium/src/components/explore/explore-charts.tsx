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

const COLORS = [
  "var(--color-primary-600)",
  "var(--color-primary-400)",
  "var(--color-warm-500)",
  "var(--color-warm-300)",
  "var(--color-primary-800)",
  "var(--color-warm-700)",
];

const PIE_COLORS = [
  "#4f7a5c",
  "#7ba68a",
  "#a8c5b2",
  "#d4a574",
  "#b8956a",
  "#8b7355",
];

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
      <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)]">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d8" />
              <XAxis
                dataKey="pillar"
                tick={{ fill: "#6b5e54", fontSize: 13 }}
              />
              <YAxis tick={{ fill: "#6b5e54", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e8e0d8",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Bar
                dataKey="treatments"
                name="Treatment Interventions"
                fill="#4f7a5c"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="publications"
                name="Prevention Publications"
                fill="#a8c5b2"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d8" />
                <XAxis type="number" tick={{ fill: "#6b5e54", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="tier"
                  width={180}
                  tick={{ fill: "#6b5e54", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e8e0d8",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="count"
                  name="Interventions"
                  fill="#4f7a5c"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d8" />
                <XAxis type="number" tick={{ fill: "#6b5e54", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={200}
                  tick={{ fill: "#6b5e54", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e8e0d8",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="count"
                  name="Interventions"
                  fill="#7ba68a"
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
                  labelLine={{ stroke: "#a89888" }}
                >
                  {studyLocationData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e8e0d8",
                    fontSize: "13px",
                  }}
                />
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
                  labelLine={{ stroke: "#a89888" }}
                >
                  {durationData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[(i + 2) % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e8e0d8",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
