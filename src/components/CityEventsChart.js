import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`City: ${payload[0].payload.city}`}</p>
        <p>{`Number of events: ${payload[0].payload.count}`}</p>
      </div>
    );
  }

  return null;
};

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      return allLocations.map((location) => {
        const count = events.filter((event) => event.location.toUpperCase() === location.toUpperCase()).length;
        const city = location.split((/, | - /))[0];
        return { city, count };
      });
    };

    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={450}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="city"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;