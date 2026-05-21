import { Dropdown } from "react-bootstrap";
import SingleTextFooter from "./SingleTextFooter";

const PrivacyAndTermsDropDown = function () {
  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle
        variant="none"
        id="dropdown-privacy-terms"
        className="p-0 border-0 d-flex align-items-center"
        style={{
          color: "rgba(130, 128, 126)",
          backgroundColor: "transparent",
        }}
      >
        <SingleTextFooter text="Termini e Privacy" />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ fontSize: "0.85rem" }}>
        <Dropdown.Item>Informativa sulla Privacy</Dropdown.Item>
        <Dropdown.Item>Accordo con l'Utente</Dropdown.Item>
        <Dropdown.Item>Politica sui Cookie</Dropdown.Item>
        <Dropdown.Item>Diritti d'Autore</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default PrivacyAndTermsDropDown;
