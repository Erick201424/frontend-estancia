import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users.js';
import Offices from './components/Offices.js';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Users/> }/>
        <Route path='/offices' element={ <Offices/> }/>
      </Routes>
    </div>
  );
}

export default App;
