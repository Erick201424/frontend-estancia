import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import UserUpdate from './components/UserUpdate';
import Offices from './components/Offices'
import OfficeUpdate from './components/OfficeUpdate'

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Users/> }/>
        <Route path="/userUpdate" element={<UserUpdate />} />
        <Route path="/office" element={<Offices />} />
        <Route path="/officeUpdate" element={<OfficeUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
