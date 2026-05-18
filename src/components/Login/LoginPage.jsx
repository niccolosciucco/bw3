import { createSlice } from "@reduxjs/toolkit"

// 1. Legge il token dal localStorage se già esiste
//    (utile dopo un refresh della pagina)
const tokenFromStorage = localStorage.getItem("linkedinToken") || null

const initialState = {
  token: tokenFromStorage,
  isLoggedIn: !!tokenFromStorage,  // true se il token c'è già
  error: null,
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => { 
      state.isLoading = true;
      state.error = null; 
    },     // parte la chiamata API
    loginSuccess: (state, action) => { 
      state.token = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("linkedinToken", action.payload);  // e salva in localStorage
     },  // chiamata OK → salva token
     
    loginFailure: (state, action) => { 
      state.isLoading = false;
      state.error = action.payload;
    },  // chiamata fallita → salva errore
    logout: (state) => { 
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        localStorage.removeItem("linkedinToken");
     },         // pulisce tutto e rimuove da localStorage
        
    clearError: (state) => { state.error = null },     // resetta l'errore (es. quando l'utente ridigita)
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer