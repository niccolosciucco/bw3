import { createSlice } from "@reduxjs/toolkit"

const imageSlice = createSlice({
  name: "image",
  initialState: {
    profileImage: null,
    profileName: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    setProfileName: (state, action) => {
      state.profileName = action.payload
    },
  },
})

export const { setProfileImage } = imageSlice.actions
export default imageSlice.reducer
