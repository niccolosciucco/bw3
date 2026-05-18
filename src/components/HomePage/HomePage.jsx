import Footer from "../Footer/Footer";
import Messages from "../Messages/Messages";
import NavbarL from "../Navbar/NavbarL";
import MainContent from "../HomePage/MainContent";

const HomePage = function () {
  return (
    <>
      <NavbarL />

      <MainContent />

      <Messages />

      <Footer />
    </>
  );
};
export default HomePage;
