import React from 'react';
import AddRoom from './components/room/AddRoom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; 
import RoomListing from './components/room/RoomListing';
 
function App() { 

  return ( 
    <>
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit-room/:roomId' element={<EditRoom />} />
          <Route path='/existing-rooms' element={<ExistingRooms />} />
          <Route path='/add-room' element={<AddRoom />} />
          <Route path='/browse-all-rooms' element={<RoomListing />} />
        </Routes>
      </Router> 
      <Footer /> 
    </main>
    </> 
  )
}

export default App
