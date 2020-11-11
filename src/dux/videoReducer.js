import axios from 'axios'

const initialState = {
  videos: [],
  isConnected: false
}

const GET_VIDEOS = 'GET_VIDEOS'
const CONNECT_VIDEO = 'CONNECT_VIDEO'
const DISCONNECT_VIDEO = 'DISCONNECT_VIDEO'

export function getVideos() {
  const payload = axios.get('/api/videos')

  return {
    type: GET_VIDEOS,
    payload: payload
  }
}
//this also needs to get the user id from somewhere?? other reducer?
export function connectVideo(video_id) {
  const payload = axios.post(`/api/users/${video_id}`)

  return {
    type: CONNECT_VIDEO,
    payload: payload
  }
}

export function disconnectVideo(video_id) {
  const payload = axios.delete(`/api/users/${video_id}`)

  return {
    type: DISCONNECT_VIDEO,
    payload: payload
  }
}

export default function (state = initialState, action) {
  // console.log('hit reducer')
  switch (action.type) {
    case GET_VIDEOS + '_PENDING':
      return { ...state }
    case GET_VIDEOS + '_FULFILLED':
      return { ...state, videos: action.payload.data }
    case GET_VIDEOS + '_REJECTED':
      return initialState
    case CONNECT_VIDEO + '_PENDING':
      return { ...state }
    case CONNECT_VIDEO + '_FULFILLED':
      return { ...state, isConnected: true }
    case CONNECT_VIDEO + '_REJECTECT':
      return initialState
    case DISCONNECT_VIDEO + '_PENDING':
      return { ...state }
    case DISCONNECT_VIDEO + '_FULFILLED':
      return { ...state, isConnected: false }
    case DISCONNECT_VIDEO + '_REJECTED':
      return initialState
    default:
      return state
  }
}