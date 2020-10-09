import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const ActorInfo = (props) => {
  const [info, setInfo] = useState({
    first_name: '',
    last_name: '',
    headshot: '',
    resume: '',
    vocal_range: '',
    height: '',
    weight: '',
    eye_color: '',
    hair_color: '',
    ethnicities: '',
    age_range: ''
  })

  const [editing, setEditing] = useState(false)

  const { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range } = info

  useEffect(() => {
    getInfo()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setInfo(state => ({ ...state, [name]: value }))
  }

  const getInfo = () => {
    axios.get('/api/users/userinfo')
      .then(res => setInfo(res.data))
  }

  const handleSubmit = (first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range) => {

    axios.put('/api/users', { first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range })
      .then(res => setInfo({
        first_name: first_name,
        last_name: last_name,
        headshot: headshot,
        resume: resume,
        vocal_range: vocal_range,
        height: height,
        weight: weight,
        eye_color: eye_color,
        hair_color: hair_color,
        ethnicities: ethnicities,
        age_range: age_range
      }))
    setEditing(false)



  }

  console.log(info)

  return (
    <div className='profile-container'>
      {props.user.isLoggedIn ? <div className='user-info'>
        {(editing) ? <button className='cancel-edit-button' onClick={() => setEditing(!editing)}>Cancel</button>
          :
          <button className='edit-info-button' onClick={() => setEditing(!editing)}>Edit My Info</button>}

        {(editing) ? (<>
          <label htmlFor='headshot'>Headshot:   <input className='headshot-input' name='headshot'
            value={headshot}
            onChange={handleChange} placeholder='Upload image and paste link here!' /></label>
          <label for="first_name">First Name:   <input className='first-name' type='text' name='first_name'
            value={first_name}
            onChange={handleChange} /></label>
          <label for="last_name">Last Name:    <input className='last-name' name='last_name'
            value={last_name}
            onChange={handleChange} /></label>
          <label for="resume">Experience:   <input className='resume' name='resume'
            value={resume}
            onChange={handleChange} /></label>
          <label for="vocal_range">Vocal Range:    <input className='vocal-range' name='vocal_range'
            value={vocal_range}
            onChange={handleChange} /></label>
          <label for="height">Height:   <input className='height' name='height'
            value={height}
            onChange={handleChange} /></label>
          <label for="weight">Weight:   <input className='weight' name='weight'
            value={weight}
            onChange={handleChange} /></label>
          <label for="eye_color">Eye Color:    <input className='eye-color' name='eye_color'
            value={eye_color}
            onChange={handleChange} /></label>
          <label for="hair_color">Hair Color:   <input className='hair-color' name='hair_color'
            value={hair_color}
            onChange={handleChange} /></label>
          <label for="ethnicities">Ethnicities:    <input className='ethnicities' name='ethnicities'
            value={ethnicities}
            onChange={handleChange} /></label>
          <label for="age_range">Age Range:    <input className='age-range' name='age-range'
            value={age_range}
            onChange={handleChange} /></label>
          <button className='save-changes' onClick={() => { handleSubmit(first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range) }}>Save Changes</button>

        </>)
          : (<>
            <div>
              <img src={info.headshot} className='headshot' />
            </div>
            <label for="">First Name:   <p>{info.first_name}</p></label>
            <label for="">Last Name:    <p>{info.last_name}</p></label>
            <label for="">Experience:   <p>{info.resume}</p></label>
            <label>Vocal Range:   <p>{info.vocal_range}</p></label>
            <label for="">Height:   <p>{info.height}</p></label>
            <label for="">Weight:   <p>{info.weight}</p></label>
            <label for="">Eye Color:    <p>{info.eye_color}</p></label>
            <label for="">Hair Color:   <p>{info.hair_color}</p></label>
            <label for="">Ethnicities:    <p>{info.ethnicities}</p></label>
            <label for="">Age Range:    <p>{info.age_range}</p></label> </>)}
      </div>
        : <div>Please log in to set up your very own profile!</div>
      }
    </div>


  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(ActorInfo)