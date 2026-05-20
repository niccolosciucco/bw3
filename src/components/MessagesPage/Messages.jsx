import { useState, useRef, useEffect } from "react"
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap"
import NavbarL from "../Navbar/NavbarL"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

const initialChats = [
  {
    id: 1,
    name: "Bilal Lafdili",
    unread: true,
    avatar: "https://placecats.com/60/60",
    messages: [
      { from: "them", text: "Ciao! Ho visto il tuo profilo", time: "10:14" },
      {
        from: "them",
        text: "Stiamo assumendo, saresti disponibile?",
        time: "10:15",
      },
      { from: "me", text: "Ciao! Sono interessato", time: "11:03" },
    ],
  },
  {
    id: 2,
    name: "Noemi Coppotelli",
    unread: true,
    avatar: "https://placecats.com/61/61",
    messages: [
      {
        from: "them",
        text: "Possiamo aiutarti a crescere",
        time: "09:22",
      },
    ],
  },
  {
    id: 3,
    name: "Mohamed Zamel",
    unread: false,
    avatar: "https://placecats.com/50/50",
    messages: [
      { from: "them", text: "Ho visto il tuo profilo", time: "14:05" },
      { from: "me", text: "Grazie, non sono interessato", time: "14:30" },
    ],
  },
  {
    id: 4,
    name: "Giulia Ciampa",
    unread: false,
    avatar: "https://placecats.com/63/63",
    messages: [
      { from: "them", text: "Ci vediamo alla conferenza?", time: "18:40" },
      { from: "me", text: "Certo!", time: "19:22" },
    ],
  },
  {
    id: 5,
    name: "Niccolò Sciucco",
    unread: false,
    avatar: "https://placecats.com/64/64",
    messages: [
      { from: "them", text: "Ti mando i case study", time: "17:00" },
      { from: "me", text: "Va bene, aspetto", time: "17:32" },
    ],
  },
  {
    id: 6,
    name: "Stefano Casasola",
    unread: true,
    avatar: "https://placecats.com/120/100",
    messages: [
      { from: "them", text: "Ciao, ho visto il tuo profilo", time: "17:00" },
      {
        from: "them",
        text: "Vorrei proporti di divenatare un nostro prof",
        time: "17:01",
      },
      { from: "me", text: "Ciao! Sono interessato", time: "18:03" },
    ],
  },
]

function Avatar({ src }) {
  return (
    <img
      src={src}
      alt="avatar"
      style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
    />
  )
}

export default function Messenger() {
  const [chats, setChats] = useState(initialChats)
  const [activeId, setActiveId] = useState(null)
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef(null)

  const activeChat = chats.find((c) => c.id === activeId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages])

  const openChat = (id) => {
    setActiveId(id)
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c)),
    )
  }

  const sendMessage = () => {
    if (!message.trim() || !activeId) return
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { from: "me", text: message.trim(), time },
              ],
            }
          : c,
      ),
    )
    setMessage("")
  }

  return (
    <>
      <NavbarL />
      <Container
        fluid
        className="p-0"
        style={{ height: "100vh", background: "#f3f2ef" }}
      >
        <Row className="g-0 h-100">
          <Col
            xs={12}
            md={4}
            lg={3}
            className=" bg-white border-end d-flex flex-column h-100"
          >
            <div className="p-3 border-bottom">
              <h5 className="mb-0 fw-bold">Messaggi</h5>
            </div>

            <ListGroup variant="flush" className="overflow-auto">
              {chats.map((chat) => {
                const lastMsg = chat.messages[chat.messages.length - 1]
                return (
                  <ListGroup.Item
                    key={chat.id}
                    action
                    onClick={() => openChat(chat.id)}
                    className="d-flex gap-3 py-3"
                    style={{
                      background: chat.id === activeId ? "#99b9f2" : "white",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar src={chat.avatar} />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <strong className={chat.unread ? "fw-bold" : ""}>
                          {chat.name}
                        </strong>
                        <small className="text-muted">{lastMsg.time}</small>
                      </div>
                      <small
                        className={`d-block text-truncate ${chat.unread ? "fw-semibold" : "text-muted"}`}
                      >
                        {lastMsg.from === "me" && "✓ "}
                        {lastMsg.text}
                      </small>
                    </div>
                    {chat.unread && (
                      <div
                        className="bg-primary rounded-circle mt-2"
                        style={{ width: 10, height: 10 }}
                      />
                    )}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col
            xs={12}
            md={8}
            lg={9}
            className="bg-white d-flex flex-column h-100"
          >
            {!activeChat ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 80, height: 80 }}
                >
                  <i className="bi bi-chat-dots fs-1 text-primary" />
                </div>
                <h6>Seleziona una chat</h6>
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center p-3 border-bottom gap-3">
                  <Avatar src={activeChat.avatar} />
                  <h6 className="mb-0 fw-bold">{activeChat.name}</h6>
                </div>

                <div
                  className="flex-grow-1 overflow-auto p-3"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {activeChat.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`d-flex mb-2 ${msg.from === "me" ? "justify-content-end" : "justify-content-start"}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-3 ${msg.from === "me" ? "bg-primary text-white" : "bg-white border"}`}
                        style={{ maxWidth: "70%" }}
                      >
                        {msg.text}
                        <div
                          className={`small ${msg.from === "me" ? "text-white-50" : "text-muted"} mt-1`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-top">
                  <div className="d-flex gap-2">
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Scrivi un messaggio..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && !e.shiftKey && sendMessage()
                      }
                      style={{ resize: "none", borderRadius: 20 }}
                    />
                    <Button
                      variant="primary"
                      className="rounded-circle"
                      onClick={sendMessage}
                    >
                      <i className="bi bi-send-fill" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
