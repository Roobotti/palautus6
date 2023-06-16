import React, { useEffect } from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { notification, dispatch } = useNotification()

  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, notification.duration * 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    notification.message && <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
