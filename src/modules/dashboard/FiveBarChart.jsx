import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const FiveBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="package_name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="subscription_count" fill="#026D4D" activeBar={<Rectangle fill="pink" stroke="blue" />} />
    </BarChart>
  </ResponsiveContainer>
  );
};

export default FiveBarChart;
