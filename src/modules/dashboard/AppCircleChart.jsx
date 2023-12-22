import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#264653", "#2a9d8f", "#e9c46a", '#f4a261', '#e76f51'];

const AppCircleChart = ({ pieChartData }) => {
  let a = 0, b = 0, c = 0, d = 0, e = 0;
  pieChartData.map((i) =>{
    switch(i.type_id) {
      case "apartment":
        a = a + Number(i.total_posts_by_type);
        break;
      case "land":
        b = b + Number(i.total_posts_by_type);
        break;
      case "office":
        c = c + Number(i.total_posts_by_type);
        break;
      case "motel":
        d = d + Number(i.total_posts_by_type);
        break;
      case "house":
        e = e + Number(i.total_posts_by_type);
        break;
      default:
        break;
    }
  })

  const data = [
    { name: "apartment", value: a },
    { name: "land", value: b },
    { name: "office", value: c },
    { name: "motel", value: d },
    { name: "house", value: e }
  ];
  console.log('aaaa: ',data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
      <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AppCircleChart;
