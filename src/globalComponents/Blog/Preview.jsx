import React from 'react';
import HtmlContent from './HtmlContent';
const { Title } = Typography;
import { Typography, Flex } from 'antd';
function Preview(props) {
  const containerStyle = {
    height: '450px',
    overflow: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
  };
  const titleStyle = {
    textAlign: 'center',
  };
  return (
    <div style={containerStyle}>
      <Flex vertical>
        <Title level={3} style={titleStyle}>
          {props.title}
        </Title>
        <HtmlContent html={props.html} />
      </Flex>
    </div>
  );
}

export default Preview;
