import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Row } from "react-bootstrap"
import ProfileHeader from "./ProfileHeader"

function Profile() {
  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <ProfileHeader />
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
