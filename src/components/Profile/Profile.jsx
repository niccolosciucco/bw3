import { Col, Container, Row } from "react-bootstrap"
import ProfileHeader from "./ProfileHeader"
import LinkedInProfileSidebar from "./SidebarProfile"
import "bootstrap/dist/css/bootstrap.min.css"
// import Footer from "../Footer/Footer"
function Profile() {
  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            <ProfileHeader />
            {/* <Footer /> */}
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
