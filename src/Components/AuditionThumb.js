import React from 'react'
import { connect } from 'react-redux'
import { connectAudition, disconnectAudition } from '../dux/auditionReducer'

const AuditionThumb = (props) => {


  const handleDisconnect = () => {
    props.disconnectAudition(props.audition.theater_id, props.audition.id)
    props.getUserAuditions()
  }

  // console.log(props)
  return (
    <div className='thumbnail'>
      {(props.actorAuditions) ?
        <button className='disconnect-button' onClick={() => { handleDisconnect() }}> - </button> : null}

      <p>Show:{props.audition.show}</p>
      <p>Run:{props.audition.run_dates}</p>
      <p>Rate:{props.audition.pay_rate}</p>
      <p>Rehersals:{props.audition.rehearsal_dates}</p>

      {(props.generalAuditions) ?
        <button className='connect-button' onClick={() => { props.connectAudition(props.audition.id, props.audition.theater_id) }}> + </button> : null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { disconnectAudition, connectAudition })(AuditionThumb)