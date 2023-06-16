import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
      <li>
        {anecdote.content} 
        <> has {anecdote.votes} </>  
        <button onClick={handleClick}>vote</button>
      </li>
    )
  }
  
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      return state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
        .sort((a, b) => b.votes - a.votes)
      })

    return(
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(setNotification( `you voted '${anecdote.content}'`, 3 ) )
            }}
          />
        )}
      </ul>
    )
  }
  
  export default Anecdotes