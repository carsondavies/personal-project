
import React, { useState } from 'react';
import './App.css';
import routes from './routes'
import Header from './Components/Header/Header'
import Auth from './Components/Auth/Auth'
import './app.scss'


function App() {


  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
