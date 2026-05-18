import { Col, Container, Row } from "react-bootstrap";
import ProfileHeader from "./ProfileHeader";
import LinkedInProfileSidebar from "./SidebarProfile";
import Footer from "../Footer/Footer";
import NavbarL from "../Navbar/NavbarL";
import Messages from "../Messages/Messages";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  return (
    <>
      <NavbarL />
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
      <Messages />
      <Footer />
    </>
  );
}

export default Profile;
