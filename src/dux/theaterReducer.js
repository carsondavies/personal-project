import axios from 'axios'

const initialState = {
  theaters: [],
  isConnected: false
}

const GET_THEATERS = 'GET_THEATERS'
const CONNECT_THEATER = 'CONNECT_THEATER'
const DISCONNECT_THEATER = 'DISCONNECT_THEATER'

export function getTheaters() {
  const payload = axios.get('/api/theaters')

  return {
    type: GET_THEATERS,
    payload: payload
  }
}
//this also needs to get the user id from somewhere?? other reducer?
export function connectTheater(theater_id) {
  const payload = axios.post(`/api/users/theaters/${theater_id}`)

  return {
    type: CONNECT_THEATER,
    payload: payload
  }
}

export function disconnectTheater(theater_id) {
  const payload = axios.delete(`/api/users/theaters/${theater_id}`)

  return {
    type: DISCONNECT_THEATER,
    payload: payload
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THEATERS + '_PENDING':
      return { ...state }
    case GET_THEATERS + '_FULFILLED':
      return { ...state, theaters: action.payload.data }
    case GET_THEATERS + '_REJECTED':
      return initialState
    case CONNECT_THEATER + '_PENDING':
      return { ...state }
    case CONNECT_THEATER + '_FULFILLED':
      return { ...state, isConnected: true }
    case CONNECT_THEATER + '_REJECTECT':
      return initialState
    case DISCONNECT_THEATER + '_PENDING':
      return { ...state }
    case DISCONNECT_THEATER + '_FULFILLED':
      return { ...state, isConnected: false }
    case DISCONNECT_THEATER + '_REJECTED':
      return initialState
    default:
      return initialState
  }
}