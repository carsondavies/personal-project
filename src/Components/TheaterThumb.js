import React from 'react'
import { connect } from 'react-redux'
import { connectTheater, disconnectTheater } from '../dux/theaterReducer'


const TheaterThumb = (props) => {
  // const [isConnected, setIsConnected] = useState(false)


  // const handleConnectTheater = () => {
  //   const { theater_id } = props.theater
  //   axios.post(`/api/users/theaters/${theater_id}`)
  //     .then(setIsConnected(true))
  //     .catch(err => console.log(err))
  //   console.log('connected to theater')
  // }

  // const handleDisconnectTheater = () => {
  //   const { theater_id } = props.theater
  //   axios.delete(`api/users/theaters/${theater_id}`)
  //     .then(setIsConnected(false))
  //     .catch(err => console.log(err))
  // }

  const handleDisconnect = () => {
    props.disconnectTheater(props.theater.theater_id)
    props.getUserTheaters()
  }

  return (
    <div>
      {(props.actorTheaters) ?
        <button className='minus-button' onClick={() => { handleDisconnect() }}> - </button> : null}

      {props.theater.theater_id}
      {props.theater.theater_name}
      {props.theater.theater_email}

      {(props.generalTheaters) ?
        <button className='plus-button' onClick={() => { props.connectTheater(props.theater.theater_id) }}> + </button> : null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectTheater, connectTheater })(TheaterThumb)