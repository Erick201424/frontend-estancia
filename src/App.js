import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Users/> }/>
      </Routes>
    </div>
  );
}

export default App;
