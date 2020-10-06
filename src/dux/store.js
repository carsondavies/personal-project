import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import auditionReducer from './auditionReducer'
import theaterReducer from './theaterReducer'
import videoReducer from './videoReducer'

const rootReducer = combineReducers({
  user: userReducer,
  auditions: auditionReducer,
  theaters: theaterReducer,
  videos: videoReducer
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))