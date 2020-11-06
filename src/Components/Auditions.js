import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AuditionThumb from './AuditionThumb'
import { getAuditions } from '../dux/auditionReducer'
import '../_profile.scss'
import '../app.scss'


const Auditions = (props) => {

  useEffect(() => {
    props.getAuditions()
  }, [])


  console.log(props)
  return (
    <div className='rb-view'>
      <div className='resource-container'>
        <div className='audition-container'>
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
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getAuditions })(Auditions)