import { Col, Container, Row } from "react-bootstrap"
import ProfileHeader from "./ProfileHeader"
import LinkedInProfileSidebar from "./SidebarProfile"
import "bootstrap/dist/css/bootstrap.min.css"

function Profile() {
  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <ProfileHeader />
          </Col>
          <Col md={4}>
            <LinkedInProfileSidebar />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
