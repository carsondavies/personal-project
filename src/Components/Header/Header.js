import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../dux/userReducer'
import axios from 'axios'

const Header = (props) => {


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
          <button className='logout-button' onClick={() => logout()}>
            Sign out.
          </button>
          <Link to='/profile/:id' className='nav-link'>
            {/* {props.user.headshot} */}
            Profile.
        </Link>
        </div>
        : (props.location.pathname === '/') ? null : <button className='login-button' onClick={() => { props.history.push('/') }}>Login.</button>}


      <Link className='nav-link' to='/auditions'>
        <p>
          Auditions.
        </p>
      </Link>


      <Link className='nav-link' to='/theaters'>
        <p>
          Theaters.
        </p>
      </Link>


      <Link className='nav-link' to='/resourcebrowser'>
        <p>
          Resource Browser.
        </p>
      </Link>

    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { logoutUser })(withRouter(Header))