import { createSlice } from "@reduxjs/toolkit"

const imageSlice = createSlice({
  name: "image",
  initialState: {
    profileImage: null,
    profileName: null,
    profileSurname: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    setProfileName: (state, action) => {
      state.profileName = action.payload
    },
    setProfileSurname: (state, action) => {
      state.profileSurname = action.payload
    },
  },
})

export const { setProfileImage, setProfileName, setProfileSurname } =
  imageSlice.actions
export default imageSlice.reducer
