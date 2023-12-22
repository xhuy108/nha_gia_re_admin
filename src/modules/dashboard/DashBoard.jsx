import React from 'react';
import './DashBoard.module.css';
import { Col, Divider, Row } from 'antd';
import AppCircleChart from '../dashboard/AppCircleChart';
import DoubleLineChart from '../dashboard/DoubleLineChart';
import FiveBarChart from '../dashboard/FiveBarChart';
import ListUser from '../dashboard/ListUser';
import { useLoaderData } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const style = {
  background: '#FFFFFF',
  padding: '24px 24px 48px 24px',
  border: '8px solid #F0F2F5',
};

export async function loader() {
  const dashboard = await ApiService.get('posts/dashboard');
  console.log('dashboard: ', dashboard);
  if (!dashboard) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { dashboard };
}

export default function DashBoard() {
  const { dashboard } = useLoaderData();
  return (
    <Row
      gutter={[16, 12]}
      style={{ backgroundColor: '#F0F2F5', padding: '24px 12px' }}
    >
      <Col className="gutter-row" span={6} style={style}>
        <div
          style={{ color: '#8C8C8C', fontSize: '14px', marginBottom: '20px' }}
        >
          Số bài đăng chờ duyệt
        </div>
        <div style={{ fontSize: '30px', fontWeight: '600' }}>
          {dashboard.countPostByStatus.map((i) => {
            if (i.status == 'pending') return i.total_posts_by_status;
          })}
        </div>
        <Divider />
        <div>
          Số bài đăng đã duyệt:{' '}
          {dashboard.countPostByStatus.map((i) => {
            if (i.status == 'approved') return i.total_posts_by_status;
          })}
        </div>
      </Col>

      <Col className="gutter-row" span={6} style={style}>
        <div
          style={{ color: '#8C8C8C', fontSize: '14px', marginBottom: '20px' }}
        >
          Số tố cáo chờ duyệt
        </div>
        <div style={{ fontSize: '30px', fontWeight: '600' }}>
          {dashboard.countReportPerStatus.map((i) => {
            if (i.status == 'pending') return i.count;
          })}
        </div>
        <Divider />
        <div>
          Số tố cáo đã duyệt:{' '}
          {dashboard.countReportPerStatus.map((i) => {
            if (i.status == 'resolved') return i.count;
          })}
        </div>
      </Col>

      <Col className="gutter-row" span={6} style={style}>
        <div
          style={{ color: '#8C8C8C', fontSize: '14px', marginBottom: '20px' }}
        >
          Số người dùng đang sử dụng
        </div>
        <div style={{ fontSize: '30px', fontWeight: '600' }}>
          {dashboard.countUserPerStatus.num_of_unverified +
            dashboard.countUserPerStatus.num_of_verified +
            dashboard.countUserPerStatus.num_of_banned}
        </div>
        <Divider />
        {/* <div>
          Số người dùng xác thực: {dashboard.countUserPerStatus.num_of_verified}
        </div> */}
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            Tỉ lệ các loại bất động sản trong các bài đăng
          </div>
          <Divider />
          <AppCircleChart
            pieChartData={dashboard.countPostByTypeInMonthOfYear}
          />
        </div>
      </Col>
      {/* <Col className="gutter-row" span={6} style={style}>
        <div
          style={{ color: '#8C8C8C', fontSize: '14px', marginBottom: '20px' }}
        >
          Tổng số bài blog đã đăng
        </div>
        <div style={{ fontSize: '30px', fontWeight: '600' }}>
          {dashboard.countBlog}
        </div>
      </Col> */}

      {/* BIEU DO DUONG */}
      <Col className="gutter-row" span={24}>
        <div style={style}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>
              Số lượng bài đăng bán/cho thuê trong năm 2023
            </div>
            <Divider />
            <div
              style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}
            >
              <div style={{ width: '75%' }}>
                <DoubleLineChart
                  pieChartData={dashboard.countPostByTypeInMonthOfYear}
                />
              </div>

              <div style={{ fontSize: '14px', fontWeight: '400' }}>
                Top người dùng có nhiều bài đăng nhất
                <ListUser data={dashboard.getTop10UsersHaveMostPosts} />
              </div>
            </div>
          </div>
        </div>
      </Col>

      {/* BIEU DO TRON */}
      {/* <Col className="gutter-row" span={8}>
        <div style={style}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            Tỉ lệ các loại bất động sản trong các bài đăng
          </div>
          <Divider />
          <AppCircleChart
            pieChartData={dashboard.countPostByTypeInMonthOfYear}
          />
        </div>
      </Col> */}

      {/* BIỂU ĐỒ CỘT */}
      {/* <Col className="gutter-row" span={16}>
        <div style={style}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            Top gói dịch vụ được sử dụng nhiều nhất
          </div>
          <Divider />
          <FiveBarChart data={dashboard.countSubscriptionPackage} />
        </div>
      </Col> */}
    </Row>
  );
}
