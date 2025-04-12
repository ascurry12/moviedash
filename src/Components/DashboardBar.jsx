import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardBar = ({ dataProp }) => {
  return (
    <div>
        <h3>Genre Count for Movies Now Playing</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={400}
          data={dataProp}
          margin={{
            top: 5,
            right: 20,
            left: 5,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="white"
            interval={0}
            fontSize={7}
            angle={25}
          />
          <YAxis fill="white" stroke="white" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#FFD301"
            activeBar={<Rectangle fill="#FDDE6C" stroke="black" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBar;
