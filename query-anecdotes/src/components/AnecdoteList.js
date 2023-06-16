import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'


  
const Anecdotes = () => {
    const queryClient =  useQueryClient() 
    const { dispatch } = useNotification()

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes').filter(a => a.id !== updatedAnecdote.id)
        queryClient.setQueryData('anecdotes', anecdotes.concat(updatedAnecdote))
      }
    }) 
    
    const voteAnecdote = (anecdote) => {
      updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `you voted '${anecdote.content}'`,
          duration: 5
        }
      })
    }

    const Anecdote = ({ anecdote }) => {
      return(
        <div>
          {anecdote.content} 
          <> has {anecdote.votes} </>
          <button onClick={() => voteAnecdote(anecdote)}>vote</button>
        </div>
      )
      }
    
    const result = useQuery('anecdotes', getAnecdotes, { retry: 1, refetchOnWindowFocus: false })
    console.log(result)
    
    
    if ( result.isLoading ) {
        return <div>loading data...</div>
      }
      
      if ( result.isError ) {
        return <div>anecdote service not available due to problems in server</div>
      }
      
    const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

    return(
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              voteAnecdote(anecdote.id)
            }}
          />
        )}
      </ul>
    )
  }
  
  export default Anecdotes