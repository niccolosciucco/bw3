import { Card, Image, Nav, ListGroup } from "react-bootstrap"
import { FaSquare } from "react-icons/fa"
import { IoBookmark } from "react-icons/io5"
import { MdGroups } from "react-icons/md"
import { BiNews } from "react-icons/bi"
import { MdEventNote } from "react-icons/md"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
const ColonnaSX = () => {
  const navigate = useNavigate()
  const profileImage = useSelector((state) => state.image.profileImage)
  return (
    <>
      {/*PRIMO BLOCCO*/}
      <Card className="mb-2 shadow-sm overflow-hidden">
        {/* Sfondo del banner */}
        <div style={{ height: "60px", backgroundColor: "#a0b4c8" }}></div>

        <Card.Body className="text-center position-relative pt-0">
          <Image
            onClick={() => navigate("/profile")}
            src={
              profileImage ||
              "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
            }
            roundedCircle
            className="position-absolute start-50 translate-middle-x"
            style={{
              width: "72px",
              height: "72px",
              border: "2px solid white",
              top: "-36px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />

          {/* Dati Profilo */}
          <div style={{ marginTop: "45px" }}>
            <h5 className="mb-0 fw-bold fs-6">Guido La Vespa</h5>
            <p className="text-secondary mb-1" style={{ fontSize: "0.85rem" }}>
              Professione
            </p>
            <p className="text-muted mb-2" style={{ fontSize: "0.75rem" }}>
              Italia
            </p>

            {/* Azienda */}
            <div
              className="d-flex align-items-center justify-content-center gap-1"
              style={{ fontSize: "0.85rem" }}
            >
              <Image
                src={
                  "https://e7.pngegg.com/pngimages/391/20/png-clipart-h-m-logo-h-m-logo-icons-logos-emojis-iconic-brands.png"
                }
                style={{ width: "16px" }}
              />
              <span className="fw-semibold">H&M</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/*SECONDO BLOCCO*/}
      <Card className="mb-2 shadow-sm">
        <Card.Body style={{ fontSize: "0.8rem" }}>
          <p className="text-muted mb-1">
            Sblocca in media 11 volte più visite del profilo con Premium
          </p>
          <Nav.Link href="#premium" className="fw-semibold text-black">
            <FaSquare
              size={22}
              style={{ color: "#E7A33E" }}
              className="p-0 me-2"
            />
            Prova di nuovo per € 0
          </Nav.Link>
        </Card.Body>
      </Card>

      {/*TERZO BLOCCO */}
      <Card className="mb-2 shadow-sm">
        <Card.Body style={{ fontSize: "0.8rem" }}>
          <Nav.Link className="fw-semibold text-black mb-3">
            Visitatori del profilo
          </Nav.Link>
          <Nav.Link className="fw-semibold text-black">
            Vedi tutte le analisi
          </Nav.Link>
        </Card.Body>
      </Card>

      {/*QUARTO BLOCCO */}
      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush" style={{ fontSize: "0.85rem" }}>
          <ListGroup.Item className="fw-semibold text-dark py-2 border-0">
            <IoBookmark size={18} className="me-1" /> Elementi salvati
          </ListGroup.Item>
          <ListGroup.Item className="fw-semibold text-dark py-2 border-0">
            <MdGroups size={18} className="me-1" /> Gruppi
          </ListGroup.Item>
          <ListGroup.Item className="fw-semibold text-dark py-2 border-0">
            <BiNews size={18} className="me-1" /> Newsletter
          </ListGroup.Item>
          <ListGroup.Item className="fw-semibold text-dark py-2">
            <MdEventNote size={18} className="me-1" /> Eventi
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  )
}

export default ColonnaSX
