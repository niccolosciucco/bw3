import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./components/Landing/LandingPage"
import LoginPage from "./components/Login/LoginPage"
import Profile from "./components/Profile/Profile"
import HomePage from "./components/HomePage/HomePage"
import JobsPage from "./components/Jobs/JobsPage"
import SearchPage from "./components/Search/SearchPage"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./store/slices/profileSlice"

import RegisterPage from "./components/Login/Registerpage" // import della pagina di registrazione;
function AppContent() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => dispatch(setUser(data)))
        .catch(() => dispatch(setUser(null)))
    } else {
      dispatch(setUser(null))
    }
  }, [token, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
export default App
