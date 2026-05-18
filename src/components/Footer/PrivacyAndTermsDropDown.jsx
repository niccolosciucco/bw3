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
        <SingleTextFooter text="Privacy and Terms" />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ fontSize: "0.85rem" }}>
        <Dropdown.Item>Privacy Policy</Dropdown.Item>
        <Dropdown.Item>User Agreement</Dropdown.Item>
        <Dropdown.Item>Cookie Policy</Dropdown.Item>
        <Dropdown.Item>Copyright Policy</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default PrivacyAndTermsDropDown;
