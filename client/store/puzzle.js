// import axios from 'axios'
import {gridValues} from '../solverEngine'
/**
 * ACTION TYPES
 */
const GOT_PUZZLE = 'GOT_PUZZLE'

/**
 * INITIAL STATE
 */
const currentPuzzle = {}

/**
 * ACTION CREATORS
 */
const gotPuzzle = puzzle => ({type: GOT_PUZZLE, puzzle})

/**
 * THUNK CREATORS
 */
export const gotPuzzleThunk = puzzle => dispatch => {
  try {
    // const res = await axios.get('/auth/me')
    dispatch(gotPuzzle(puzzle))
    gridValues(puzzle)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = currentPuzzle, action) {
  switch (action.type) {
    case GOT_PUZZLE:
      return {...state, currentPuzzle: action.puzzle}
    default:
      return state
  }
}
