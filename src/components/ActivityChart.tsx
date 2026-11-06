import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { money, activity } from "../store";
export default function ActivityChart() {
  const [view, setView] = useState("Monthly");
  const values =
    view === "Monthly"
      ? activity
      : [
          { month: "Mon", balance: 41200 },
          { month: "Tue", balance: 42600 },
          { month: "Wed", balance: 41900 },
          { month: "Thu", balance: 44600 },
          { month: "Fri", balance: 48750 },
        ];
  return (
    <section className="panel activity-panel">
      <div className="section-heading">
        <h2>
          Balance activity{" "}
          <span className="info-dot" title="Illustrative balance snapshots">
            i
          </span>
        </h2>
        <div className="segmented">
          {["Monthly", "Weekly"].map((v) => (
            <button
              className={v === view ? "selected" : ""}
              key={v}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-summary">
        <strong>$48,750.00</strong>
        <span>
          <ArrowUpRight size={13} />
          {view === "Monthly" ? "+50.93%" : "+18.33%"}
        </span>
        <small>{view === "Monthly" ? "over 6 months" : "this week"}</small>
        <div className="chart-legend">
          <i />
          Account balance
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={values}
            margin={{ top: 17, right: 12, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#1a2639"
              vertical={false}
              strokeDasharray="3 5"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#748299", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              domain={[20000, 60000]}
              ticks={[20000, 30000, 40000, 50000, 60000]}
              tickFormatter={(v) => "$" + v / 1000 + "k"}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#748299", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                background: "#111c30",
                border: "1px solid #2c4264",
                borderRadius: 10,
                color: "#f8fafc",
              }}
              formatter={(value) => [money(Number(value)), "Demo balance"]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#4c96ff"
              strokeWidth={2.5}
              fill="url(#chartFill)"
              activeDot={{
                r: 5,
                fill: "#8bc2ff",
                stroke: "#3b82f6",
                strokeWidth: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
