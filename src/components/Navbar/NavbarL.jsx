import {
  Navbar,
  Container,
  InputGroup,
  Form,
  Nav,
  Dropdown,
  Image,
  Button,
} from "react-bootstrap"
import {
  FaLinkedin,
  FaBriefcase,
  FaSquare,
  FaSortAmountDownAlt,
} from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5"
import { AiFillHome } from "react-icons/ai"
import { BsPeopleFill } from "react-icons/bs"
import { AiFillMessage } from "react-icons/ai"
import { IoNotifications } from "react-icons/io5"
import { BsGrid3X3GapFill } from "react-icons/bs"

const NavbarL = () => {
  return (
    <Navbar className="bg-body-white">
      <Container className="d-flex justify-content-start align-items-center px-lg-5  ">
        {/*IMMAGINE MOBILE */}

        <Image
          className="d-block me-2 d-lg-none"
          src="https://placecats.com/50/50"
          roundedCircle
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          alt="Profilo"
        />

        {/*LOGO + BARRA DI RICERCA */}
        <div className="d-flex align-items-center mx-auto me-lg-auto">
          <Navbar.Brand href="#home" className="me-2 d-none d-lg-block">
            <FaLinkedin className="text-primary" size={38} />
          </Navbar.Brand>
          <Form>
            <InputGroup className="d-flex align-items-center border rounded-pill py-1 px-3">
              <IoSearchSharp size={18} />
              <Form.Control
                type="search"
                placeholder="Cerca"
                className="border-0 bg-transparent py-0 px-1 fs-6"
              ></Form.Control>
            </InputGroup>
          </Form>
        </div>

        {/*ICONE MOBILE */}
        <div className="d-flex justify-content-between d-md-none gap-2">
          <Button className="bg-transparent border-0 p-0">
            <AiFillMessage size={22} style={{ color: "#666666" }} />
          </Button>
          <Button className="bg-transparent border-0 p-0">
            <FaSortAmountDownAlt size={22} style={{ color: "#666666" }} />
          </Button>
        </div>

        {/*ICONE*/}
        <div
          className="d-none d-md-flex align-items-center justify-content-between ms-md-2"
          style={{ width: "650px" }}
        >
          <Nav.Link className="text-center">
            <AiFillHome size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Home
            </p>
          </Nav.Link>
          <Nav.Link className="text-center">
            <BsPeopleFill size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              La mia rete
            </p>
          </Nav.Link>
          <Nav.Link className="text-center">
            <FaBriefcase size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Lavoro
            </p>
          </Nav.Link>
          <Nav.Link className="text-center">
            <AiFillMessage size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Messaggistica
            </p>
          </Nav.Link>
          <Nav.Link className="text-center">
            <IoNotifications size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Notifiche
            </p>
          </Nav.Link>

          {/*PROFILO */}
          <div className="d-flex flex-column align-items-center">
            <Image
              className="d-none d-lg-block"
              src="https://placecats.com/50/50"
              roundedCircle
              style={{ width: "24px", height: "24px", objectFit: "cover" }}
              alt="Profilo"
            />
            <Dropdown>
              <Dropdown.Toggle
                className="d-none d-lg-flex align-items-center bg-transparent text-black border-0 p-0"
                id="dropdown-basic"
              >
                <p
                  className="mb-0 text-center"
                  style={{ color: "#666666", fontSize: "0.75rem" }}
                >
                  Tu
                </p>
              </Dropdown.Toggle>
              {/*DROPDOWN */}
              <Dropdown.Menu align="end" className="py-1 pt-3">
                <Dropdown.Item className="px-2 mx-0">
                  <div className="d-flex align-items-center">
                    <Image
                      src="https://placecats.com/50/50"
                      roundedCircle
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                      alt="Profilo"
                    />
                    <div className="ms-2">
                      <h5 className="fs-6 m-0">Guido La Vespa </h5>
                      <p className="m-0" style={{ fontSize: "0.9rem" }}>
                        Professione
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-center mt-2 gap-1">
                    <Button
                      className="bg-white rounded-pill"
                      style={{ color: "#0B5ED7", fontSize: "0.9rem" }}
                    >
                      Visualizza Profilo
                    </Button>
                    <Button
                      className="text-white rounded-pill"
                      style={{ backgroundColor: "#0B5ED7", fontSize: "0.9rem" }}
                    >
                      Verifica ora
                    </Button>
                  </div>
                  <hr />
                  <div>
                    <p className="fw-semibold fs-6 p-0 mb-2">Account</p>
                    <p
                      className="p-0 mb-2 fw-semibold text-secondary"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {" "}
                      <FaSquare
                        size={22}
                        style={{ color: "#E7A33E" }}
                        className="p-0 me-2"
                      />
                      1 month of Premium for € 0
                    </p>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Impostazioni e Privacy
                    </Nav.Link>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Guida
                    </Nav.Link>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Lingua
                    </Nav.Link>
                  </div>
                  <hr />
                  <div>
                    <p className="fw-semibold p-0 mb-2">Gestisci</p>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Post e attività
                    </Nav.Link>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Account per la pubblicazione di
                      <br /> offerte di lavoro
                    </Nav.Link>
                  </div>
                  <hr />
                  <div>
                    <Nav.Link
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Esci
                    </Nav.Link>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/*PARTE FINALE DI DX*/}
          <div className="vr me-2 d-none d-lg-block mx-2"></div>
          <div className="d-none d-lg-flex align-items-center flex-column">
            <BsGrid3X3GapFill size={22} style={{ color: "#666666" }} />
            <p
              className="mb-0"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Per le aziende
            </p>
          </div>
          <div className="d-none d-lg-flex align-items-center">
            <Button className="bg-transparent border-0 p-0 me-1">
              <FaSquare size={22} style={{ color: "#E7A33E" }} />
            </Button>
            <p
              className="mb-0 text-center"
              style={{ color: "#666666", fontSize: "0.75rem" }}
            >
              Prova di nuovo <br />
              Premium
            </p>
          </div>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarL
