import { useEffect, useState } from "react"
import { Card, Image, Button } from "react-bootstrap"

export default function ProfileHeader() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWZhMGNhNjU0YTMxNTAwMTU1OGIxY2QiLCJpYXQiOjE3NzkwOTY0MTMsImV4cCI6MTc4MDMwNjAxM30.4ZYhlDaW1-qbEulYKWDfjZy8KKBgikwsK1bZX_6CWoU",
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Errore fetch profilo:", err))
  }, [])

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src="cover.jpg" />

      <Card.Body className="text-center">
        {profile && (
          <>
            <Image
              src={profile.image}
              roundedCircle
              width={120}
              height={120}
              className="mb-3"
            />

            <h4 className="fw-bold">
              {profile.name} {profile.surname}
            </h4>

            <p className="mb-1">{profile.title}</p>

            <p className="text-muted">{profile.area}</p>

            <p>{profile.bio}</p>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button variant="primary">Disponibile per</Button>
              <Button variant="outline-secondary">Aggiungi sezione</Button>
              <Button variant="outline-secondary">Migliora profilo</Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
