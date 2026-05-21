import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Login/LoginPage";
import Profile from "./components/Profile/Profile";
import HomePage from "./components/HomePage/HomePage";
import JobsPage from "./components/Jobs/JobsPage";
import SearchPage from "./components/Search/SearchPage";
import ProfileView from "./components/Profile/ProfileView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/profileSlice";
import MessagesPage from "./components/MessagesPage/Messages";

import RegisterPage from "./components/Login/Registerpage"; // import della pagina di registrazione;
import SudokuPage from "./components/games/SudokuPage";
import ChessPage from "./components/games/ChessPage";
import Cruciverba from "./components/games/Cruciverba";
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/" replace />;
};

function AppContent() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => dispatch(setUser(data)))
        .catch(() => dispatch(setUser(null)));
    } else {
      dispatch(setUser(null));
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/games/sudoku" element={<SudokuPage />} />
        <Route path="/games/chess" element={<ChessPage />} />
        <Route path="/games/cruciverba" element={<Cruciverba />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
export default App;
