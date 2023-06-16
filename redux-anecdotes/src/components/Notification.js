import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      console.log(notification.duration)
      const timeout = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.duration * 1000) // Convert seconds to milliseconds

      return () => {
        clearTimeout(timeout)
      }

    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification.message && <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
