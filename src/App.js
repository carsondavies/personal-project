
import React, { useState } from 'react';
import './App.css';
import routes from './routes'
import Header from './Components/Header/Header'
import Auth from './Components/Auth/Auth'


function App() {


  return (
    <div className="App">
      <Header />
      <Auth />
      {routes}
    </div>
  );
}

export default App;
