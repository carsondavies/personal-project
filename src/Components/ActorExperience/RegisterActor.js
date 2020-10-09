import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../dux/userReducer'



const RegisterActor = (props) => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })
  const { first_name, last_name, email, password } = state


  function handleChange(e) {
    const { name, value } = e.target
    setState(state => ({ ...state, [name]: value }))
  }

  function handleCancel() {
    setState(state => ({ ...state, first_name: '', last_name: '', email: '', password: '' }))
  }

  function handleRegister() {
    axios
      .post('auth/register', { first_name, last_name, email, password })
      // console.log(first_name, last_name)
      .then((res) => {
        console.log(res.data)
        props.loginUser(res.data)
        props.history.push('/profile/:id')
      })
      .catch(err => {
        alert(err)
      })
  }

  return (
    <div className='register-actor-view'>
      <div className='register-form-container'>
        <h1>Register</h1>

        <input
          type='text'
          name='first_name'
          value={first_name}
          onChange={handleChange}
          placeholder='First Name' />


        <input
          type='text'
          name='last_name'
          value={last_name}
          onChange={handleChange}
          placeholder='Last Name' />


        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='Email' />


        <input
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          placeholder='Password' />

        <div className='register-button-container'>
          <button onClick={() => handleCancel()}>Cancel</button>
          <button onClick={() => { handleRegister() }}>Register</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { loginUser })(withRouter(RegisterActor))