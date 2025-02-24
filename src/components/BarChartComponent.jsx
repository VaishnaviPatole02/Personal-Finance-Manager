import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 500 },
  { name: "Feb", value: 700 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 800 },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#5A9" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
