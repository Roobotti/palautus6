import { createSlice } from '@reduxjs/toolkit'

const initialState = { message:'', duration:NaN }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        duration: action.payload.duration || 5,
        }
      },
    clearNotification: (state) => {
      return initialState
    }
  }
})

export const setNotification = (message, duration) => {
  return {
    type: 'notification/setNotification',
    payload: {
      message,
      duration
    }
  }
}


export const { clearNotification } = notificationSlice.actions
export default notificationSlice.reducer