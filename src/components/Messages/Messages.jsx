import { useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FaChevronUp, FaChevronDown, FaEllipsisH } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

function Messages() {
  const [isOpen, setIsOpen] = useState(false);
  const chats = [
    {
      id: 1,
      name: "Bilal Lafdili",
      lastMess: `Hi,
                I came across your profile and was impressed by your experience in digital marketing.
                We’re currently hiring for a similar role in a fast-growing company.
                Would you be open to a quick 15-minute introductory call this week?`,
      avatar: "https://placecats.com/40/40",
    },
    {
      id: 2,
      name: "Noemi Coppotelli",
      lastMess: `Hello!
                We help professionals like you increase productivity by up to 40% with our innovative solution.
                I’d love to share some information and see if it could be relevant for you — would that be okay?`,
      avatar: "https://placecats.com/50/50",
    },
    {
      id: 3,
      name: "Mohamed Jaouad",
      lastMess: `Dear Professional,
                I carefully reviewed your profile and was truly impressed by your background.
                I’d like to present you with an outstanding opportunity in the financial sector with unlimited growth potential.
                When would you be available to discuss further?`,
      avatar: "https://placecats.com/90/90",
    },
    {
      id: 4,
      name: "Giulia Ciampa",
      lastMess: `Hi!
                We briefly met at the innovation conference in Milan yesterday.
                I really enjoyed our conversation about AI and corporate training — would love to stay in touch and maybe continue the discussion soon.`,
      avatar: "https://placecats.com/70/70",
    },
    {
      id: 4,
      name: "Niccolò Sciucco",
      lastMess: `Hi,
                I’ve been following your company’s projects for a while and really like your positioning.
                I’m a B2B tech copywriter — happy to share a couple of case studies if that would be helpful.`,
      avatar: "https://placecats.com/80/80",
    },
    {
      id: 5,
      name: "Stefano Casasola",
      lastMess: `Hey legend 
                Not sure if you’re open to new wealth streams, but I’ve been quietly building passive income in Web3 since 2021.
                We’re onboarding a few ambitious professionals who want to escape the 9–5.
                Are you open-minded?`,
      avatar: "https://placecats.com/60/60",
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
          onClick={() => setIsOpen(!isOpen)}
          className="d-flex justify-content-between align-items-center bg-white border-bottom-0"
          style={{ cursor: "pointer", padding: "10px 12px" }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://placecats.com/41/41"
              alt="personal profile"
              className="rounded-circle"
            />
            <strong style={{ fontSize: "14px" }}>Messages</strong>
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
              onClick={() => setIsOpen(!isOpen)}
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
                placeholder="Find Messages"
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
