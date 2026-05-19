import Footer from "../Footer/Footer";
import Messages from "../Messages/Messages";
import NavbarL from "../Navbar/NavbarL";
import MainContent from "../HomePage/MainContent";

const HomePage = function () {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "rgba(244, 242, 238)" }}
    >
      <NavbarL />
      <main className="flex-grow-1">
        <MainContent />
      </main>
      <Messages />
      <Footer />
    </div>
  );
};
export default HomePage;
