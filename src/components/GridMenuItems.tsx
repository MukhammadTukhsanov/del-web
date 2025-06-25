import { Col, Row } from 'antd';
import GridMenuItem from './GridMenuItem';
// import BasketItem from './basket-item';

export default function GridMenuItems() {
  return (
    <Row gutter={[16, 16]}>
      {[...Array(8)].map((_, index) => (
        <Col xs={8} sm={8} md={8} lg={8} key={index}>
          <GridMenuItem />
        </Col>
      ))}
    </Row>
  );
}
