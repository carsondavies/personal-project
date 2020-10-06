import React from 'react'
import { connect } from 'react-redux'
import { connectAudition, disconnectAudition } from '../dux/auditionReducer'

const AuditionThumb = (props) => {
  // const [isConnected, setIsConnected] = useState(false)

  // const handleConnectAudition = () => {
  //   const { theater_id, id } = props.audition
  //   axios.post(`/api/users/${id}/${theater_id}`)
  //     .then(setIsConnected(true))
  //     .catch(err => console.log(err))
  //   console.log('connected to audition')
  // }

  // const handleDisconnectAudition = () => {
  //   const { theater_id } = props.audition
  //   axios.delete(`/api/users/${theater_id}`)
  //     .then(setIsConnected(false))
  //     .catch(err => console.log(err))
  //   console.log('disconnected from audition')
  // }

  const handleDisconnect = () => {
    props.disconnectAudition(props.audition.theater_id, props.audition.id)
    props.getUserAuditions()
  }

  // console.log(props)
  return (
    <div>
      {(props.actorAuditions) ?
        <button className='minus-button' onClick={() => { handleDisconnect() }}> - </button> : null}

      {props.audition.id}
      {props.audition.show}

      {(props.generalAuditions) ?
        <button className='plus-button' onClick={() => { props.connectAudition(props.audition.id, props.audition.theater_id) }}> + </button> : null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectAudition, connectAudition })(AuditionThumb)