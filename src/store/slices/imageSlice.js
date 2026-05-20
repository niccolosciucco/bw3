import { createSlice } from "@reduxjs/toolkit"

const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

const initialState = {
  profileImage: loadFromLocalStorage("profileImage"),
  profileName: loadFromLocalStorage("profileName"),
  profileSurname: loadFromLocalStorage("profileSurname"),
  coverImage: loadFromLocalStorage("coverImage"),
}

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
      localStorage.setItem("profileImage", JSON.stringify(action.payload))
    },
    setProfileName: (state, action) => {
      state.profileName = action.payload
      localStorage.setItem("profileName", JSON.stringify(action.payload))
    },
    setProfileSurname: (state, action) => {
      state.profileSurname = action.payload
      localStorage.setItem("profileSurname", JSON.stringify(action.payload))
    },
    setCoverImage: (state, action) => {
      state.coverImage = action.payload
      localStorage.setItem("coverImage", JSON.stringify(action.payload))
    },
  },
})

export const {
  setProfileImage,
  setProfileName,
  setProfileSurname,
  setCoverImage,
} = imageSlice.actions
export default imageSlice.reducer
