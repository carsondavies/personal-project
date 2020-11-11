import axios from 'axios'

const initialState = {
  auditions: [],
  isConnected: false
}

const GET_AUDITIONS = 'GET_AUDITIONS'
const CONNECT_AUDITIONS = 'CONNECT_AUDITIONS'
const DISCONNECT_AUDITIONS = 'DISCONNECT_AUDITIONS'

export function getAuditions() {
  const payload = axios.get('/api/auditions')

  return {
    type: GET_AUDITIONS,
    payload: payload
  }
}
//this also needs to get the user id from somewhere?? other reducer?
export function connectAudition(audition_id, theater_id) {
  const payload = axios.post(`/api/users/${audition_id}/${theater_id}`)

  return {
    type: CONNECT_AUDITIONS,
    payload: payload
  }
}

export function disconnectAudition(theater_id, audition_id) {
  const payload = axios.delete(`/api/users/${theater_id}/${audition_id}`)

  return {
    type: DISCONNECT_AUDITIONS,
    payload: payload
  }
}

export default function (state = initialState, action) {
  // console.log(state)
  switch (action.type) {
    case GET_AUDITIONS + '_PENDING':
      return { ...state }
    case GET_AUDITIONS + '_FULFILLED':
      return { ...state, auditions: action.payload.data }
    case GET_AUDITIONS + '_REJECTED':
      return initialState
    case CONNECT_AUDITIONS + '_PENDING':
      return { ...state }
    case CONNECT_AUDITIONS + '_FULFILLED':
      // console.log('hit fulfilled')
      return { ...state, isConnected: true }
    case CONNECT_AUDITIONS + '_REJECTED':
      return initialState
    case DISCONNECT_AUDITIONS + '_PENDING':
      return { ...state }
    case DISCONNECT_AUDITIONS + '_FULFILLED':
      return { ...state, isConnected: false }
    case DISCONNECT_AUDITIONS + '_REJECTED':
      return initialState
    default:
      return state
  }
}