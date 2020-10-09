import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../dux/userReducer'

const Auth = (props) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = state;

  function handleChange(e) {
    const { name, value } = e.target
    setState(state => ({ ...state, [name]: value }))
  }

  function handleLogin(e) {
    axios
      .post('auth/login', { email, password })
      .then((res) => {
        props.loginUser(res.data)
        props.history.push('/profile/:id')
      })
  }






  return (
    <div className='auth-view'>
      <div className='auth-container'>
        <div className='auth-logos'>
          <h1>
            <img src='https://th.bing.com/th/id/OIP.yVInmA-VBCbAtnxGu-P3WgHaHa?pid=Api&rs=1' alt='masks logo' />
          </h1>
          <h2>THEATERHUB.</h2>
        </div>
        <div className='input-boxes'>
          <label>Email:
            <input
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
              placeholder='enter email' />
          </label>
          <label>Password:
             <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder='enter password' />
          </label>
        </div>
        <div className='auth-button-container'>
          <button onClick={() => { handleLogin() }}>Login</button>
          <button onClick={() => { props.history.push('/registeractor') }}>Register</button>
        </div>
      </div>
    </div>
  )
}

const mapStatetoProps = reduxState => reduxState

export default connect(mapStatetoProps, { loginUser })(withRouter(Auth))