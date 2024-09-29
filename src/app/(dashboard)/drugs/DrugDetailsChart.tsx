import React from "react";
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

const data = [
	{ name: "Mon", value: 25 },
	{ name: "Tue", value: 30 },
	{ name: "Wed", value: 35 },
	{ name: "Thu", value: 50 },
	{ name: "Fri", value: 75 },
	{ name: "Sat", value: 65 },
	{ name: "Sun", value: 40 },
];

export default function WeeklyChart() {
	return (
		<div className="w-full h-72 mt-6">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#ff9800" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#ff9800" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
					<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
					<YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} domain={[0, 100]} />
					<Tooltip />

					{/* Shading under the line */}
					<Area type="monotone" dataKey="value" stroke="#FF9D42" fill="url(#colorUv)" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
