import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: 'Anekdootin sisällön tulee olla vähintään 5 merkkiä pitkä!',
          duration: 5
        },
      })
    } else {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `anecdote '${content} created'`,
          duration: 5
        }
      })
      create(event)
    }
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
