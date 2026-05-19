import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./components/Landing/LandingPage"
import LoginPage from "./components/Login/LoginPage"
import Profile from "./components/Profile/Profile"
import HomePage from "./components/HomePage/HomePage"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
