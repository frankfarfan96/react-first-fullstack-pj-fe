import React from 'react';
import AddRoom from './components/room/AddRoom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; 
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import './index.css'
import CheckOut from './components/bookings/CheckOut';
import BookingSuccess from './components/bookings/BookingSuccess';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
 
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
          <Route path='/book-room/:roomId' element={<CheckOut />} />
          <Route path='/browse-all-rooms' element={<RoomListing />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/booking-success' element={<BookingSuccess />} />
          <Route path='/existing-bookings' element={<Bookings />} />
          <Route path='/find-booking' element={<FindBooking />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router> 
      <Footer /> 
    </main>
    </> 
  )
}

export default App
