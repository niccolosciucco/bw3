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
  profileProfession: loadFromLocalStorage("profileProfession"),
  profileLocation: loadFromLocalStorage("profileLocation"),
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
    setProfileProfession: (state, action) => {
      state.profileProfession = action.payload
      localStorage.setItem("profileProfession", JSON.stringify(action.payload))
    },
    setProfileLocation: (state, action) => {
      state.profileLocation = action.payload
      localStorage.setItem("profileLocation", JSON.stringify(action.payload))
    },
  },
})

export const {
  setProfileImage,
  setProfileName,
  setProfileSurname,
  setCoverImage,
  setProfileProfession,
  setProfileLocation,
} = imageSlice.actions

export default imageSlice.reducer
