import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import NavbarL from "../Navbar/NavbarL";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const initialChats = [
  {
    id: 1,
    name: "Ciuchino",
    unread: true,
    avatar: "https://upload.wikimedia.org/wikipedia/it/e/ee/Ciuchino.png",
    messages: [
      {
        from: "them",
        text: "Shrek!!! Senti, ma siamo già arrivati? Rispondi!",
        time: "10:14",
      },
      {
        from: "them",
        text: "Fiona mi ha detto che dovevo scriverti qui su Link-o-coso. Comunque stasera facciamo i waffle a casa mia, ti ho già taggato nel post! Rispondi rispondi rispondi!",
        time: "10:15",
      },
      {
        from: "me",
        text: "Ciuchino, ti ho detto di non scrivermi più. E NO, non siamo arrivati. Smetti di taggarmi.",
        time: "11:03",
      },
    ],
  },
  {
    id: 2,
    name: "Gatto con gli Stivali",
    unread: true,
    avatar: "https://i.ytimg.com/vi/hZM9AVqDaCc/sddefault.jpg",
    messages: [
      {
        from: "them",
        text: "Señor Shrek. La mia lama è al vostro servizio, ma il mio portfolio ha bisogno di una raccomandazione. Potreste confermare la mia competenza in 'Sguardi Magnetici' e 'Spadaccino B2C'? I signorotti di Molto Molto Lontano non pagano i posizionamenti.",
        time: "09:22",
      },
    ],
  },
  {
    id: 3,
    name: "Lord Farquaad",
    unread: false,
    avatar:
      "https://static.wikia.nocookie.net/dreamworks/images/4/4b/Lord_Farquaad_Profile.jpg/revision/latest?cb=20231226033734",
    messages: [
      {
        from: "them",
        text: "Ascolta, Orco. Il contratto per la rimozione degli abusivi (i fanatici delle fiabe) dalla tua proprietà non è ancora stato formalizzato. Inoltre, esigo un feedback a 5 stelle sulla mia leadership.",
        time: "14:05",
      },
      {
        from: "them",
        text: "Se rifiuti, potrei dover rivalutare l'altezza del tuo canone d'affitto.",
        time: "14:07",
      },
      {
        from: "me",
        text: "Ti ho portato la principessa, mantieni i patti e sparisci da questa palude.",
        time: "14:30",
      },
    ],
  },
  {
    id: 4,
    name: "Principe Azzurro",
    unread: false,
    avatar:
      "https://preview.redd.it/can-anyone-recreate-prince-charming-from-shrek-in-oblivion-v0-2buxis9sr1ye1.jpeg?auto=webp&s=4b5dbc3a9bcc4eb2a86b422640d3042d1ba2173c",
    messages: [
      {
        from: "them",
        text: "Ciao 'Shrek'. Ho visto che hai aggiornato la tua qualifica in 'Consulente della Corona'. È ridicolo. Quel posto spettava a ME.",
        time: "18:40",
      },
      {
        from: "them",
        text: "Ti dispiace fare un post di debunking e spiegare a tutti che la vera star della fiera sono io? Il mio biondo platino merita più reach organica.",
        time: "18:42",
      },
      {
        from: "me",
        text: "Cerca di non farti cadere una torre addosso anche su LinkedIn. Buona giornata.",
        time: "19:22",
      },
    ],
  },
  {
    id: 5,
    name: "Fiona",
    unread: false,
    avatar:
      "https://static.wikia.nocookie.net/protagonists/images/d/de/Princess-fiona1.jpg/revision/latest?cb=20130118011430",
    messages: [
      {
        from: "them",
        text: "Amore, quando hai finito di fare networking sulla palude, ricordati che stasera abbiamo i miei genitori a cena.",
        time: "17:00",
      },
      {
        from: "them",
        text: "Papà vuole parlarti di una 'joint venture' per la gestione del regno. Vedi di lavarti e non ruttare durante l'antipasto. Grazie.",
        time: "17:05",
      },
      {
        from: "me",
        text: "Va bene... ma posso ruttare almeno dopo il dolce? Arrivo.",
        time: "17:32",
      },
    ],
  },
  {
    id: 6,
    name: "Pinocchio",
    unread: true,
    avatar:
      "https://static.wikia.nocookie.net/universalstudios/images/1/19/Pinocchioooo.webp/revision/latest?cb=20260317204827",
    messages: [
      {
        from: "them",
        text: "Onestamente? Non mi interessa affatto lavorare con te, non mi serve nessun network e non ho assolutamente usato il tuo account premium per spiare la Fata Madrina. No no.",
        time: "17:00",
      },
      {
        from: "them",
        text: "(Perché il mio profilo dice che il mio naso è cresciuto di un pollice dopo questo messaggio?)",
        time: "17:01",
      },
      {
        from: "me",
        text: "Pinocchio, si vede lontano un miglio che stai mentendo (letteralmente).",
        time: "18:03",
      },
    ],
  },
];

function Avatar({ src }) {
  return (
    <img
      src={src}
      alt="avatar"
      style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
    />
  );
}

export default function Messenger() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const openChat = (id) => {
    setActiveId(id);
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c)),
    );
  };

  const sendMessage = () => {
    if (!message.trim() || !activeId) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
    );
    setMessage("");
  };

  return (
    <>
      <NavbarL />
      <Container fluid className="p-0" style={{ background: "#f3f2ef" }}>
        <Row className="g-0">
          <Col
            xs={12}
            md={4}
            lg={3}
            className="bg-white border-end d-flex flex-column overflow-hidden"
          >
            <div className="p-3 border-bottom">
              <h5 className="mb-0 fw-bold">Messaggi</h5>
            </div>

            <ListGroup variant="flush" className="overflow-auto">
              {chats.map((chat) => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <ListGroup.Item
                    key={chat.id}
                    action
                    onClick={() => openChat(chat.id)}
                    className="d-flex gap-3 py-3 align-items-center"
                    style={{
                      background: chat.id === activeId ? "#99b9f2" : "white",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar src={chat.avatar} />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong
                          className={`text-truncate ${chat.unread ? "fw-bold" : ""}`}
                          style={{ maxWidth: "70%" }}
                        >
                          {chat.name}
                        </strong>
                        <small className="text-muted ms-2 flex-shrink-0">
                          {lastMsg.time}
                        </small>
                      </div>
                      <small
                        className={`d-block text-truncate ${chat.unread ? "fw-semibold" : "text-muted"}`}
                        style={{ maxWidth: "100%" }}
                      >
                        {lastMsg.from === "me" && "✓ "}
                        {lastMsg.text}
                      </small>
                    </div>
                    {chat.unread && (
                      <div
                        className="bg-primary rounded-circle flex-shrink-0"
                        style={{ width: 10, height: 10 }}
                      />
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col
            xs={12}
            md={8}
            lg={9}
            className="bg-white d-flex flex-column"
            style={{ height: "39em" }}
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
                      "url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                  <div ref={messagesEndRef} />
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
  );
}
