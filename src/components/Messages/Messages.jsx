import { Card, Button, ListGroup } from "react-bootstrap";
import { FaChevronUp, FaChevronDown, FaEllipsisH } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleMessages } from "../../store/slices/messagesSlice";
function Messages() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.messages.isMessagesOpen);
  const profileImage = useSelector((state) => state.image.profileImage);
  const chats = [
    {
      id: 1,
      name: "Ciuchino",
      lastMess: `Shrek!!! Senti, ma siamo già arrivati? Rispondi! 
              Fiona mi ha detto che dovevo scriverti qui su Link-o-coso. 
              Comunque stasera facciamo i waffle a casa mia, ti ho già taggato nel post! Rispondi rispondi rispondi!`,
      avatar: "https://upload.wikimedia.org/wikipedia/it/e/ee/Ciuchino.png",
    },
    {
      id: 2,
      name: "Gatto con gli Stivali",
      lastMess: `Señor Shrek. La mia lama è al vostro servizio, ma il mio portfolio ha bisogno di una raccomandazione. 
              Potreste confermare la mia competenza in "Sguardi Magnetici" e "Spadaccino B2C"? 
              I signorotti di Molto Molto Lontano non pagano i posizionamenti.`,
      avatar: "https://i.ytimg.com/vi/hZM9AVqDaCc/sddefault.jpg",
    },
    {
      id: 3,
      name: "Lord Farquaad",
      lastMess: `Ascolta, Orco. Il contratto per la rimozione degli abusivi (i fanatici delle fiabe) dalla tua proprietà non è ancora stato formalizzato. 
              Inoltre, esigo un feedback a 5 stelle sulla mia leadership. 
              Se rifiuti, potrei dover rivalutare l'altezza del tuo canone d'affitto.`,
      avatar:
        "https://static.wikia.nocookie.net/dreamworks/images/4/4b/Lord_Farquaad_Profile.jpg/revision/latest?cb=20231226033734",
    },
    {
      id: 4,
      name: "Principe Azzurro",
      lastMess: `Ciao "Shrek". Ho visto che hai aggiornato la tua qualifica in "Consulente della Corona". 
              È ridicolo. Quel posto spettava a ME. 
              Ti dispiace fare un post di debunking e spiegare a tutti che la vera star della fiera sono io? Il mio biondo platino merita più reach organica.`,
      avatar:
        "https://preview.redd.it/can-anyone-recreate-prince-charming-from-shrek-in-oblivion-v0-2buxis9sr1ye1.jpeg?auto=webp&s=4b5dbc3a9bcc4eb2a86b422640d3042d1ba2173c",
    },
    {
      id: 5,
      name: "Fiona",
      lastMess: `Amore, quando hai finito di fare networking sulla palude, ricordati che stasera abbiamo i miei genitori a cena. 
              Papà vuole parlarti di una "joint venture" per la gestione del regno. 
              Vedi di lavarti e non ruttare durante l'antipasto. Grazie.`,
      avatar:
        "https://static.wikia.nocookie.net/protagonists/images/d/de/Princess-fiona1.jpg/revision/latest?cb=20130118011430",
    },
    {
      id: 6,
      name: "Pinocchio",
      lastMess: `Onestamente? Non mi interessa affatto lavorare con te, non mi serve nessun network e non ho assolutamente usato il tuo account premium per spiare la Fata Madrina. No no. 
              (Perché il mio profilo dice che il mio naso è cresciuto di un pollice dopo questo messaggio?)`,
      avatar:
        "https://static.wikia.nocookie.net/universalstudios/images/1/19/Pinocchioooo.webp/revision/latest?cb=20260317204827",
    },
  ];

  return (
    <div
      className="d-none d-md-block"
      style={{
        position: "fixed",
        bottom: 0,
        right: "24px",
        width: "320px",
        zIndex: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Card border="light">
        <Card.Header
          onClick={() => dispatch(toggleMessages())}
          className="d-flex justify-content-between align-items-center bg-white border-bottom-0"
          style={{ cursor: "pointer", padding: "10px 12px" }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src={
                profileImage ||
                "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
              }
              alt="personal profile"
              className="rounded-circle"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <strong style={{ fontSize: "14px" }}>Messaggi</strong>
          </div>

          <div
            className="d-flex align-items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="link"
              className="p-1 text-dark d-flex align-items-center"
            >
              <FaEllipsisH size={16} />
            </Button>
            <Button
              variant="link"
              className="p-1 text-dark d-flex align-items-center"
            >
              <BsPencilSquare size={16} />
            </Button>
            <Button
              variant="link"
              className="p-1 text-dark d-flex align-items-center"
              onClick={() => dispatch(toggleMessages())}
            >
              {isOpen ? <FaChevronDown size={14} /> : <FaChevronUp size={14} />}
            </Button>
          </div>
        </Card.Header>

        {isOpen && (
          <Card.Body
            className="p-0"
            style={{
              height: "400px",
              overflowY: "auto",
              backgroundColor: "#fff",
            }}
          >
            <div className="p-2 border-bottom">
              <input
                type="text"
                placeholder="Trova Messaggi"
                className="form-control form-control-sm"
                style={{ backgroundColor: "#edf3f8", border: "none" }}
              />
            </div>

            <ListGroup variant="flush">
              {chats.map((chat) => (
                <ListGroup.Item
                  key={chat.id}
                  action
                  className="d-flex align-items-center gap-2 py-2"
                  style={{ borderBottom: "1px solid #f3f3f3" }}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div className="text-truncate" style={{ fontSize: "13px" }}>
                    <div className="fw-bold text-dark">{chat.name}</div>
                    <div className="text-muted text-truncate">
                      {chat.lastMess}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}

export default Messages;
