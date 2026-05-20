import { Card, Row, Col, Stack, Button } from "react-bootstrap"
import {
  BsCheckCircleFill,
  BsGlobe2,
  BsHandThumbsUp,
  BsChatText,
  BsShare,
  BsSendFill,
} from "react-icons/bs"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { IoCloseSharp } from "react-icons/io5"
import { useState } from "react"

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)

  const formatTime = (isoString) => {
    if (!isoString) return "1s"
    const postDate = new Date(isoString)
    const now = new Date()
    const diffMs = now - postDate
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins <= 0 ? 1 : diffMins}m`
    if (diffHours < 24) return `${diffHours}o`
    return `${diffDays}g`
  }

  const hasValidImage =
    post.image && post.image !== "undefined" && post.image.trim() !== ""

  const handleLike = () => setLiked(!liked)

  return (
    <Card
      style={{
        maxWidth: "640px",
        width: "100%",
        borderColor: "rgba(0,0,0,0.08)",
      }}
      className="shadow-sm rounded-4 mt-3 mx-auto"
    >
      <Card.Header className="bg-white border-0 pt-3 pb-2 px-3 rounded-top-4">
        <Row className="align-items-center g-0">
          <Col xs="auto" className="me-2">
            <img
              src={
                post.user?.image ||
                "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
              }
              alt="User avatar"
              width="48"
              height="48"
              className="rounded-circle border"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
              }}
            />
          </Col>

          <Col className="overflow-hidden">
            <div className="d-flex align-items-center lh-1 mb-1">
              <span
                className="fw-bold me-1 text-dark text-truncate"
                style={{ fontSize: "14px" }}
              >
                {post.user
                  ? `${post.user.name} ${post.user.surname}`
                  : `@${post.username}`}
              </span>
              {post.username === "mashfrog_group" && (
                <BsCheckCircleFill
                  className="text-primary"
                  style={{ fontSize: "14px" }}
                />
              )}
            </div>

            <div
              className="text-muted text-truncate mb-1"
              style={{ fontSize: "11px" }}
            >
              {post.user?.title || "Membro di LinkedIn"}
            </div>

            <div
              className="text-muted d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              <span>{formatTime(post.createdAt)}</span>
              <span className="mx-1">•</span>
              <BsGlobe2 className="me-1" style={{ fontSize: "12px" }} />
              <span>Global</span>
            </div>
          </Col>

          <Col xs="auto" className="d-flex align-items-start">
            <Stack direction="horizontal" gap={1}>
              <Button
                variant="link"
                className="text-muted p-1 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <BiDotsHorizontalRounded size={20} />
              </Button>
              <Button
                variant="link"
                className="text-muted p-1 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <IoCloseSharp size={20} />
              </Button>
            </Stack>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body className="pt-1 pb-2 px-3">
        <p
          className="mb-0 text-dark"
          style={{
            fontSize: "14px",
            lineHeight: "1.4",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.text}
        </p>
      </Card.Body>

      {hasValidImage && (
        <Card.Body className="p-0">
          <div className="bg-light border-top border-bottom">
            <img
              src={post.image}
              alt="Post media"
              className="w-100"
              style={{
                maxHeight: "450px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none"
              }}
            />
          </div>
        </Card.Body>
      )}

      {/* FOOTER STATISTICHE */}
      <Card.Footer
        className="bg-white border-0 pt-2 pb-2 px-3 text-muted"
        style={{ fontSize: "12px" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <Stack direction="horizontal" gap={1} className="align-items-center">
            <div
              className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "16px", height: "16px" }}
            >
              <BsHandThumbsUp size={10} className="text-white" />
            </div>
            <span className="text-truncate">Consigliato da altri utenti</span>
          </Stack>
          <span className="text-nowrap cursor-pointer">Commenti</span>
        </div>
      </Card.Footer>

      {/* FOOTER AZIONI */}
      <Card.Footer className="p-1 bg-white border-top d-flex justify-content-between row g-0 rounded-bottom-4">
        <Col>
          <Button
            variant="white"
            onClick={handleLike}
            className={`w-100 py-2 btn-outline-light border-0 d-flex flex-column align-items-center justify-content-center transition-all ${liked ? "text-primary" : "text-muted"}`}
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            <BsHandThumbsUp
              size={18}
              className={`mb-1 ${liked ? "fill-primary" : ""}`}
              style={liked ? { transform: "scale(1.1)" } : {}}
            />
            <span style={{ color: liked ? "#0a66c2" : "inherit" }}>
              Consiglia
            </span>
          </Button>
        </Col>

        <Col>
          <Button
            variant="white"
            className="w-100 py-2 btn-outline-light text-muted border-0 d-flex flex-column align-items-center justify-content-center"
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            <BsChatText size={18} className="mb-1" />
            <span>Commenta</span>
          </Button>
        </Col>

        <Col>
          <Button
            variant="white"
            className="w-100 py-2 btn-outline-light text-muted border-0 d-flex flex-column align-items-center justify-content-center"
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            <BsShare size={18} className="mb-1" />
            <span>Diffondi</span>
          </Button>
        </Col>

        <Col>
          <Button
            variant="white"
            className="w-100 py-2 btn-outline-light text-muted border-0 d-flex flex-column align-items-center justify-content-center"
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            <BsSendFill size={18} className="mb-1" />
            <span>Invia</span>
          </Button>
        </Col>
      </Card.Footer>
    </Card>
  )
}

export default PostCard
