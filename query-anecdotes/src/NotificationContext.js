import { createContext, useReducer, useContext } from 'react'

const initialState = {
  message: '',
  duration: 0,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        duration: action.payload.duration || 5,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const { notification, dispatch } = useContext(NotificationContext)
  return { notification, dispatch }
}

export default NotificationContext
