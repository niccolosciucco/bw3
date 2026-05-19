import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isMessagesOpen: false,
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,

  reducers: {
    toggleMessages: (state) => {
      if (state.isMessagesOpen === true) {
        // SE la tendina dei messaggi è aperta (true), allora la CHIUDIAMO (false)
        state.isMessagesOpen = false
      } else {
        // ALTRIMENTI (se era chiusa, quindi false), allora la APRIAMO (true)
        state.isMessagesOpen = true
      }
    },
  },
})

export const { toggleMessages } = messagesSlice.actions
export default messagesSlice.reducer
