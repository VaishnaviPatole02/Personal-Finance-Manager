import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ expenses }) => {
  // ✅ Aggregate expenses by category
  const data = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

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
