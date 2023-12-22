import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ["#1890FF", "#13C2C2", "#52C41A", '#FADB14', '#FF4D4F', '#722ED1'];

const DoubleLineChart = ({ pieChartData }) => {
  
// bai dang ban 12 thang
let t1b = 0, t2b = 0, t3b = 0, t4b = 0, t5b = 0, t6b = 0, t7b = 0, t8b = 0, t9b = 0, t10b = 0, t11b = 0, t12b = 0;
let t1t = 0, t2t = 0, t3t = 0, t4t = 0, t5t = 0, t6t = 0, t7t = 0, t8t = 0, t9t = 0, t10t = 0, t11t = 0, t12t = 0;
  pieChartData.map((i) =>{
    switch(i.month) {
      case "1":
        i.is_lease ? t1t = t1t + Number(i.total_posts_by_type) : t1b = t1b + Number(i.total_posts_by_type)
        break;
        
        case "2":
          i.is_lease ? t2t = t2t + Number(i.total_posts_by_type) : t2b = t2b + Number(i.total_posts_by_type)
          break;

          case "3":
        i.is_lease ? t3t = t3t + Number(i.total_posts_by_type) : t3b = t3b + Number(i.total_posts_by_type)
        break;

        case "4":
          i.is_lease ? t4t = t4t + Number(i.total_posts_by_type) : t4b = t4b + Number(i.total_posts_by_type)
          break;

          case "5":
        i.is_lease ? t5t = t5t + Number(i.total_posts_by_type) : t5b = t5b + Number(i.total_posts_by_type)
        break;

        case "6":
          i.is_lease ? t6t = t6t + Number(i.total_posts_by_type) : t6b = t6b + Number(i.total_posts_by_type)
          break;

          case "7":
        i.is_lease ? t7t = t7t + Number(i.total_posts_by_type) : t7b = t7b + Number(i.total_posts_by_type)
        break;

        case "8":
          i.is_lease ? t8t = t8t + Number(i.total_posts_by_type) : t8b = t8b + Number(i.total_posts_by_type)
          break;
  
          case "9":
            i.is_lease ? t9t = t9t + Number(i.total_posts_by_type) : t9b = t9b + Number(i.total_posts_by_type)
            break;
  
            case "10":
          i.is_lease ? t10t = t10t + Number(i.total_posts_by_type) : t10b = t10b + Number(i.total_posts_by_type)
          break;
  
          case "11":
            i.is_lease ? t11t = t11t + Number(i.total_posts_by_type) : t11b = t11b + Number(i.total_posts_by_type)
            break;
  
            case "12":
          i.is_lease ? t12t = t12t + Number(i.total_posts_by_type) : t12b = t12b + Number(i.total_posts_by_type)
          break;
      default:
        break;
    }
  })

  const data = [
    { name: "Tháng 1", sale: t1b, rent: t1t },
    { name: "Tháng 2", sale: t2b, rent: t2t },
    { name: "Tháng 3", sale: t3b, rent: t3t },
    { name: "Tháng 4", sale: t4b, rent: t4t },
    { name: "Tháng 5", sale: t5b, rent: t5t },
    { name: "Tháng 6", sale: t6b, rent: t6t },
    { name: "Tháng 7", sale: t7b, rent: t7t },
    { name: "Tháng 8", sale: t8b, rent: t8t },
    { name: "Tháng 9", sale: t9b, rent: t9t },
    { name: "Tháng 10", sale: t10b, rent: t10t },
    { name: "Tháng 11", sale: t11b, rent: t11t },
    { name: "Tháng 12", sale: t12b, rent: t12t },
  ];
  console.log('aaaa: ',data);

  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rent" stroke="#EB7910" activeDot={{ r: 8 }} strokeWidth="2"/>
          <Line type="monotone" dataKey="sale" stroke="#026D4D" strokeWidth="2"/>
        </LineChart>
      </ResponsiveContainer>
  );
};

export default DoubleLineChart;
