import { Col, Container, Row } from "react-bootstrap";

const HomePage = function () {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} lg={3}>
            {/* colonna a sinistra */}
          </Col>
          <Col xs={12} lg={6}>
            {/* colonna centrale */}
          </Col>
          <Col xs={12} lg={3}>
            {/* colonna a desta */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
