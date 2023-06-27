import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SeatSelect from '../SeatSelect/SeatSelect'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<h1>App</h1>} />
      <Route path="/seatselect" element={<SeatSelect />} />
    </Routes>
  )
}

export default App
