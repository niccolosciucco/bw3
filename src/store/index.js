import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messagesReducer from "./slices/messagesSlice";
import imageReducer from "../store/slices/imageSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    image: imageReducer,
    profile: profileReducer,
  },
});

export default store;
