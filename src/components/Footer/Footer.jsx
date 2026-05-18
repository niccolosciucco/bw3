import { Col, Container, Row } from "react-bootstrap"
import SingleTextFooter from "./SingleTextFooter"
import SingleIconAndTextFooter from "./SingleIconAndTextFooter"
// import { AiFillQuestionCircle, AiFillSetting } from "react-icons/ai";
import DropDownFooter from "./DropDownFooter"
import PrivacyAndTermsDropDown from "./PrivacyAndTermsDropDown"
// import { FaShieldAlt } from "react-icons/fa";

const Footer = function () {
  return (
    <div style={{ backgroundColor: "rgba(244, 242, 238)" }}>
      <Container>
        <Row className="gy-4">
          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="About" />
            <SingleTextFooter text="Community Guidelines" />
            <PrivacyAndTermsDropDown />
            <SingleTextFooter text="Sales Solutions" />
            <SingleTextFooter text="Safety Center" />
          </Col>

          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="Accesibility" />
            <SingleTextFooter text="Carrers" />
            <SingleTextFooter text="Add Choices" />
            <SingleTextFooter text="Mobile" />
          </Col>

          <Col xs={12} lg={2} className="d-flex flex-column gap-2">
            <SingleTextFooter text="Talent Solutions" />
            <SingleTextFooter text="Marketing Solutions" />
            <SingleTextFooter text="Advertising" />
            <SingleTextFooter text="Small Business" />
          </Col>

          <Col xs={12} lg={3} className="d-flex flex-column">
            <SingleIconAndTextFooter
              icon={AiFillQuestionCircle}
              title="Questions?"
              subTitle="Visit our Help Center"
            />

            <SingleIconAndTextFooter
              icon={AiFillSetting}
              title="Manage your account and privacy"
              subTitle="Go to your settings"
            />

            <SingleIconAndTextFooter
              icon={FaShieldAlt}
              title="Recommendation transparency"
              subTitle="Learn more about Recommended Content"
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
  )
}

export default Footer
