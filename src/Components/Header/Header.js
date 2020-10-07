import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../dux/userReducer'
import axios from 'axios'

const Header = (props) => {

  // useEffect(() => {
  //   props.getUser()
  // })

  const logout = () => {
    axios.delete('auth/logout').then(() => {
      props.logoutUser()
      props.history.push('/')
    })
  }

  return (
    <div className='nav-container'>
      {props.user.isLoggedIn === true ?
        <div className='profile-header'>
          <Link to='/profile/:id' className='profile-pic'>
            {/* {props.user.headshot} */}
            Profile
        </Link>
          <button className='logout-button' onClick={() => logout()}>
            logout
          </button>
        </div>
        : null}

      <Link to='/auditions'>
        Auditions
      </Link>

      <Link to='/theaters'>
        Theaters
      </Link>

      <Link to='/resourcebrowser'>
        Resource Browser
      </Link>

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { logoutUser })(withRouter(Header))