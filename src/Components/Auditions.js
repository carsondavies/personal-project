import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AuditionThumb from './AuditionThumb'
import { getAuditions } from '../dux/auditionReducer'

const Auditions = (props) => {

  useEffect(() => {
    props.getAuditions()
  }, [])


  console.log(props)
  return (
    <div>
      {props.auditions.auditions.map((audition) => {
        return (
          <AuditionThumb
            key={audition.id}
            audition={audition}
            getAuditions={getAuditions}
            generalAuditions={true} />
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getAuditions })(Auditions)