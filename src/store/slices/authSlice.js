import { createSlice } from "@reduxjs/toolkit";

// Legge il token dal localStorage se già presente (es. dopo un refresh della pagina)
const tokenFromStorage = localStorage.getItem("linkedinToken") || null;

const initialState = {
  token: tokenFromStorage,
  isLoggedIn: !!tokenFromStorage, // true se il token esiste già
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Chiamato quando l'utente preme "Accedi" e la chiamata API è partita
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Chiamato quando la chiamata API ha avuto successo
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      // Salva il token nel localStorage così sopravvive al refresh
      localStorage.setItem("linkedinToken", action.payload);
    },

    // Chiamato quando la chiamata API fallisce
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // messaggio di errore
    },

    // Chiamato quando l'utente preme "Esci"
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      // Rimuove il token dal localStorage
      localStorage.removeItem("linkedinToken");
    },

    // Pulisce eventuali errori precedenti (utile quando l'utente ricomincia a scrivere)
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
