import { Col, Container, Row } from "react-bootstrap";
import ColonnaSX from "./ColonnaSX";
import CentralContent from "./CentralContent";
// import ColonnaDX from "./ColonnaDX";

const HomePage = function () {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} lg={3}>
            {/* colonna a sinistra */}
            <ColonnaSX />
          </Col>
          <Col xs={12} lg={6}>
            <CentralContent />
          </Col>
          <Col xs={12} lg={3}>
            {/* colonna a desta */}
            {/* <ColonnaDX /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
