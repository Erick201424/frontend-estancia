import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import UserUpdate from './components/UserUpdate';
import Offices from './components/Offices'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Users/> }/>
        <Route path="/userUpdate" element={<UserUpdate />} />
        <Route path="/office" element={<Offices />} />
        <Route path='/offices' element={ <Offices/> }/>
      </Routes>
    </div>
  );
}

export default App;
