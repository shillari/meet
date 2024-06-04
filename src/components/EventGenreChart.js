import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

const EventGenreChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#8282FF', '#83C1FF', '#DF83FF', '#FF8783', '#FF83CA'];

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {

    return genres.map((genre) => {
      const value = events.filter((event) => event.summary.includes(genre)).length;
      const name = genre;
      return { name, value };
    });
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={450}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8282FF"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius='60%'
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

    </ResponsiveContainer>
  );
}


export default EventGenreChart;