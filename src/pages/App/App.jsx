import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SeatSelect from '../SeatSelect/SeatSelect'
import AllEventsPage from '../AllEventsPage/AllEventsPage.jsx'
import EventDetailsPage from '../EventDetailsPage/EventDetailsPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>The quick brown fox jumps over the lazy dog</h1>} />
      <Route path="/seatselect" element={<SeatSelect />} />
      <Route path="/events" element={<AllEventsPage/>} />
      <Route path="/events/:eventId" element={<EventDetailsPage />} /> 
    </Routes>
  )
}

export default App
