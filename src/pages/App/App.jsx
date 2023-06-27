import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SeatSelect from '../SeatSelect/SeatSelect'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>The quick brown fox jumps over the lazy dog</h1>} />
      <Route path="/seatselect" element={<SeatSelect />} />
    </Routes>
  )
}

export default App
