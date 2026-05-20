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
import "./NavbarL.css"
import { useState } from "react"
import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import { logout } from "../../store/slices/authSlice"

const NavbarL = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isHomepage = location.pathname.startsWith("/home")
  const isJobsPage = location.pathname.startsWith("/jobs")
  const isMessagesPage = location.pathname.startsWith("/messages")
  const profileImage = useSelector((state) => state.image.profileImage)
  console.log("stato redux image:", profileImage)

  const [searchQuery, setSearchQuery] = useState("")
  return (
    <Navbar className="bg-white border-bottom py-1">
      <Container className="w-100">
        {/*IMMAGINE NAVBAR MOBILE */}
        <Image
          onClick={() => navigate("/profile")}
          className="d-block me-2 d-lg-none"
          src={profileImage}
          roundedCircle
          style={{
            width: "30px",
            height: "30px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          alt="Profilo"
        />

        <div className="d-flex align-items-center">
          {/*LOGO NAVBAR DESKTOP*/}
          <Navbar.Brand
            onClick={() => navigate("/home")}
            className="me-2 d-none d-lg-block"
            style={{ cursor: "pointer" }}
          >
            <FaLinkedin className="text-primary" size={38} />
          </Navbar.Brand>
          {/*BARRA DI RICERCA */}
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              navigate("/search")
            }}
          >
            <InputGroup className="d-flex align-items-center border rounded-pill py-1 px-3">
              <IoSearchSharp size={18} />
              <Form.Control
                type="search"
                placeholder="Cerca"
                className="border-0 bg-transparent py-0 px-1 fs-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></Form.Control>
            </InputGroup>
          </Form>
        </div>

        {/*ICONE MOBILE */}
        <div className="d-flex justify-content-between d-md-none gap-2">
          <Link
            to={"/home"}
            className="text-decoration-none text-center"
            style={{ color: isHomepage ? "#191919" : " #666666" }}
          >
            <AiFillHome size={22} />
          </Link>
          <Button className="bg-transparent border-0 p-0 btn-navbar">
            <FaSortAmountDownAlt size={22} />
          </Button>
        </div>

        {/*ICONE DESKTOP*/}
        <div
          className="d-none d-md-flex align-items-center justify-content-between ms-md-2"
          style={{ width: "650px" }}
        >
          {/*HOME*/}
          <Link
            to={"/home"}
            className="text-decoration-none text-center"
            style={{ color: isHomepage ? "#191919" : " #666666" }}
          >
            <AiFillHome size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              Home
            </p>
          </Link>

          {/*LA MIA RETE*/}
          <Nav.Link className="text-center btn-navbar">
            <BsPeopleFill size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              La mia rete
            </p>
          </Nav.Link>

          {/*LAVORO*/}
          <Link
            to={"/jobs"}
            className="text-decoration-none text-center"
            style={{ color: isJobsPage ? "#191919" : " #666666" }}
          >
            <FaBriefcase size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              Lavoro
            </p>
          </Link>

          {/*MESSAGGISTICA*/}
          <Link
            to={"/messages"}
            className="text-decoration-none text-center"
            style={{ color: isMessagesPage ? "#191919" : " #666666" }}
          >
            <AiFillMessage size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              Messaggistica
            </p>
          </Link>

          {/*NOTIFICHE*/}
          <Nav.Link className="text-center btn-navbar">
            <IoNotifications size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              Notifiche
            </p>
          </Nav.Link>

          {/*DROPDOWN - TU */}
          <div className="d-flex flex-column align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                className="d-none d-lg-inline-flex align-items-center bg-transparent text-black border-0 p-0"
                id="dropdown-basic"
                style={{ gap: "4px" }}
              >
                <div className="d-flex flex-column align-items-center ">
                  <Image
                    className="d-none d-lg-block"
                    src={
                      profileImage ||
                      "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                    }
                    roundedCircle
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                    alt="Profilo"
                  />
                  <p
                    className="mb-0 text-center"
                    style={{
                      color: "#666666",
                      fontSize: "0.75rem",
                      paddingRight: "8px",
                    }}
                  >
                    Tu
                  </p>
                </div>
              </Dropdown.Toggle>
              {/*DROPDOWN MENU */}
              <Dropdown.Menu
                align="end"
                className="py-1 pt-3 px-3"
                style={{
                  width: "290px",
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    className="d-none d-lg-block"
                    src={
                      profileImage ||
                      "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                    }
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
                    variant="outline-primary"
                    onClick={() => navigate("/profile")}
                    className="rounded-pill fw-semibold py-1 ps-3 pe-5 text-start"
                    style={{
                      fontSize: "1rem",
                      borderWidth: "1.5px",
                      lineHeight: "1.2rem",
                    }}
                  >
                    Visualizza <br /> profilo
                  </Button>
                  <Button
                    variant="primary"
                    className="rounded-pill fw-semibold py-1 ps-3 pe-4 text-start"
                    style={{ fontSize: "1rem", lineHeight: "1.2rem" }}
                  >
                    Verifica <br /> ora
                  </Button>
                </div>
                <hr />
                <div>
                  <p className="fw-semibold fs-6 p-0 mb-2">Account</p>
                  <div className="d-flex align-items-center">
                    <FaSquare
                      size={15}
                      style={{ color: "#E7A33E" }}
                      className="p-0 me-1"
                    />
                    <p
                      className="p-0 mb-2 fw-semibold text-secondary"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Sblocca la tua prova gratuita di 1 mese
                    </p>
                  </div>
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
                    onClick={() => {
                      dispatch(logout())
                      navigate("/")
                    }}
                  >
                    Esci
                  </Nav.Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/*PARTE FINALE DI DX*/}
          <div className="vr me-2 d-none d-lg-block mx-2"></div>
          <div className="d-none d-lg-flex align-items-center flex-column btn-navbar">
            <BsGrid3X3GapFill size={22} />
            <p className="mb-0" style={{ fontSize: "0.75rem" }}>
              Per le aziende
            </p>
          </div>
          <div className="d-none d-lg-flex align-items-center">
            <Button className="bg-transparent border-0 p-0 me-1">
              {/*  <FaSquare size={22} style={{ color: "#E7A33E" }} /> */}
              <i
                className="bi bi-currency-dollar fs-6 rounded-1"
                style={{
                  backgroundColor: "#E7A33E",
                }}
              ></i>
            </Button>
            <p
              className="mb-0 text-center btn-navbar"
              style={{ fontSize: "0.75rem" }}
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
