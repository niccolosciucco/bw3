import { Col, Container, Row } from "react-bootstrap"
import ProfileHeader from "./ProfileHeader"
import LinkedInProfileSidebar from "./SidebarProfile"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
function Profile() {
  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            <ProfileHeader />
          </Col>
          <Col md={3}>
            <LinkedInProfileSidebar />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
