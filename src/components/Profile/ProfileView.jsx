import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card } from "react-bootstrap"
import NavbarL from "../Navbar/NavbarL"

function ProfileView() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!id || !token) return
    fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err))
  }, [id, token])

  if (!profile) return <><NavbarL /><p className="p-4">Caricamento profilo...</p></>

  return (
    <>
      <NavbarL />
      <Container className="mt-4">
        <Row>
          <Col xs={12} lg={8}>
            <Card className="p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={profile.image || "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"}
                  alt={`${profile.name} ${profile.surname}`}
                  className="rounded-circle"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <h4 className="mb-0">{profile.name} {profile.surname}</h4>
                  <p className="text-muted mb-0">{profile.title}</p>
                  <p className="text-secondary small mb-0">{profile.area}</p>
                </div>
              </div>
              {profile.bio && <p>{profile.bio}</p>}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfileView
