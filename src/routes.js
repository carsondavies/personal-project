import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import Auth from './Components/Auth/Auth'
import ActorProfile from './Components/ActorExperience/ActorProfile'
import RegisterActor from './Components/ActorExperience/RegisterActor'
import Auditions from './Components/Auditions'
import Theaters from './Components/Theaters'
import ResourceBrowser from './Components/ResourceBrowser'


export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/registeractor' component={RegisterActor} />
    <Route path='/profile/:id' component={ActorProfile} />
    <Route path='/auditions' component={Auditions} />
    <Route path='/theaters' component={Theaters} />
    <Route path='/resourcebrowser' component={ResourceBrowser} />
    <Route render={() => <Redirect to='/' />} />
  </Switch>
)