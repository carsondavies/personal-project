import React, { useState, useEffect } from 'react'
import ActorInfo from './ActorInfo'
import ActorAuditions from './ActorAuditions'
import ActorTheaters from './ActorTheaters'
import ActorResources from './ActorResources'

const ActorProfile = () => {
  const [tab, setTab] = useState(0)


  return (
    <div className='profile-view'>

      <button onClick={() => { setTab(0) }}>My Info</button>
      <button onClick={() => { setTab(1) }}>My Auditions</button>
      <button onClick={() => { setTab(2) }}>My Theaters</button>
      <button onClick={() => { setTab(3) }}>My Videos</button>
      {tab === 0 ? <ActorInfo /> : null}
      {tab === 1 ? <ActorAuditions /> : null}
      {tab === 2 ? <ActorTheaters /> : null}
      {tab === 3 ? <ActorResources /> : null}
    </div>
  )
}

export default ActorProfile