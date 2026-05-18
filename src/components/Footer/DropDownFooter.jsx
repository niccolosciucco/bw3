import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SingleTextFooter from "./SingleTextFooter";

function DropDownFooter() {
  const [selectedLanguage, setSelectedLanguage] = useState("English (English)");

  const handleSelect = (eventKey) => {
    setSelectedLanguage(eventKey);
  };

  return (
    <>
      <SingleTextFooter text="Seleziona Lingua" />
      <Dropdown className="w-100" onSelect={handleSelect}>
        <Dropdown.Toggle
          variant="none"
          id="dropdown-basic"
          className="w-100 d-flex justify-content-between align-items-center bg-white text-dark border border-secondary-subtle rounded-1 py-1 px-2"
          style={{ fontSize: "0.9rem", borderColor: "#82807e" }}
        >
          {selectedLanguage}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <Dropdown.Item eventKey="Italiano (Italian)">
            Italiano (Italian)
          </Dropdown.Item>
          <Dropdown.Item eventKey="English (English)">
            English (English)
          </Dropdown.Item>
          <Dropdown.Item eventKey="Français (French)">
            Français (French)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropDownFooter;
