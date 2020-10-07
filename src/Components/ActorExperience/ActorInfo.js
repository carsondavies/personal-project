import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ActorInfo = () => {
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
      .then(res => setInfo(res.data))
    setEditing(false)


  }

  console.log(info)

  return (
    <div className='user-info'>

      <button className='edit-info-button' onClick={() => setEditing(!editing)}>Edit My Info</button>

      {(editing) ? (<>
        <label htmlFor='headshot'>Headshot:<input name='headshot'
          value={headshot}
          onChange={handleChange} /></label>
        <input type='text' name='first_name'
          value={first_name}
          onChange={handleChange} />
        <input name='last_name'
          value={last_name}
          onChange={handleChange} />
        <input name='resume'
          value={resume}
          onChange={handleChange} />
        <input name='vocal_range'
          value={vocal_range}
          onChange={handleChange} />
        <input name='height'
          value={height}
          onChange={handleChange} />
        <input name='weight'
          value={weight}
          onChange={handleChange} />
        <input name='eye_color'
          value={eye_color}
          onChange={handleChange} />
        <input name='hair_color'
          value={hair_color}
          onChange={handleChange} />
        <input name='ethnicities'
          value={ethnicities}
          onChange={handleChange} />
        <input name='age-range'
          value={age_range}
          onChange={handleChange} />
        <button onClick={() => { handleSubmit(first_name, last_name, headshot, resume, vocal_range, height, weight, eye_color, hair_color, ethnicities, age_range) }}>Save Changes</button> </>)
        : (<>
          <p>{info.headshot}</p>
          <p>{info.first_name}</p>
          <p>{info.last_name}</p>
          <p>{info.resume}</p>
          <p>{info.vocal_range}</p>
          <p>{info.height}</p>
          <p>{info.weight}</p>
          <p>{info.eye_color}</p>
          <p>{info.hair_color}</p>
          <p>{info.ethnicities}</p>
          <p>{info.age_range}</p> </>)}
    </div>
  )
}

export default ActorInfo