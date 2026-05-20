import { Col, Container, Row } from "react-bootstrap"
import ProfileHeader from "./ProfileHeader"
import LinkedInProfileSidebar from "./SidebarProfile"
import Footer from "../Footer/Footer"
import NavbarL from "../Navbar/NavbarL"
import Messages from "../Messages/Messages"
import "bootstrap/dist/css/bootstrap.min.css"

function Profile() {
  return (
    <>
      <NavbarL />
      <Container className="">
        <Row className=" mt-3">
          <Col xs={12} lg={9} className="mb-4">
            <ProfileHeader />
          </Col>
          <Col xs={12} lg={3}>
            <LinkedInProfileSidebar />
          </Col>
          <Footer />
        </Row>
      </Container>
      <Messages />
    </>
  )
}

export default Profile
