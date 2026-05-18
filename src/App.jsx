import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Messages from "./components/Messages/Messages";
import NavbarL from "./components/Navbar/NavbarL";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarL />
        <Profile />
        <Messages />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
