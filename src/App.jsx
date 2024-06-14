import React from 'react';
import AddRoom from './components/room/AddRoom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ExistingRooms from './components/room/ExistingRooms';

function App() { 

  return (
    <>
      <AddRoom />
      <ExistingRooms />
    </>
  )
}

export default App
