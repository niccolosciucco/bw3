import { Col, Container, Row } from "react-bootstrap";
import SingleTextFooter from "./SingleTextFooter";
import SingleIconAndTextFooter from "./SingleIconAndTextFooter";
import { AiFillQuestionCircle, AiFillSetting } from "react-icons/ai";
import DropDownFooter from "./DropDownFooter";
import PrivacyAndTermsDropDown from "./PrivacyAndTermsDropDown";
import { FaShieldAlt } from "react-icons/fa";

const Footer = function () {
  return (
    <div style={{ backgroundColor: "rgba(244, 242, 238)" }} className="mt-5">
      <Container>
        <Row className="gy-4">
          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="Informazioni" />
            <SingleTextFooter text="Linee guida della community" />
            <PrivacyAndTermsDropDown />{" "}
            <SingleTextFooter text="Soluzioni di vendita" />
            <SingleTextFooter text="Centro sicurezza" />
          </Col>

          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="Accessibilità" />
            <SingleTextFooter text="Lavora con noi" />
            <SingleTextFooter text="Opzioni per gli annunci" />
            <SingleTextFooter text="Mobile" />
          </Col>

          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="Soluzioni Talent" />
            <SingleTextFooter text="Soluzioni di Marketing" />
            <SingleTextFooter text="Pubblicità" />
            <SingleTextFooter text="Piccole imprese" />
          </Col>

          <Col xs={12} lg={3} className="d-flex flex-column">
            <SingleIconAndTextFooter
              icon={AiFillQuestionCircle}
              title="Domande?"
              subTitle="Visita il nostro Centro assistenza"
            />

            <SingleIconAndTextFooter
              icon={AiFillSetting}
              title="Gestisci account e privacy"
              subTitle="Vai alle impostazioni"
            />

            <SingleIconAndTextFooter
              icon={FaShieldAlt}
              title="Trasparenza dei consigli"
              subTitle="Scopri di più sui contenuti consigliati"
            />
          </Col>

          <Col xs={12} lg={3}>
            <DropDownFooter />
          </Col>

          <Col>
            <p>Linkedln Corporation ⓒ {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
