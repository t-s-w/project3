import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SeatSelect from '../SeatSelect/SeatSelect'
import AllEventsPage from '../AllEventsPage/AllEventsPage.jsx'
import EventDetailsPage from '../EventDetailsPage/EventDetailsPage';
import './App.css'
import NavBar from "../../components/NavBar";
import SignUpPage from '../SignUpPage/SignUpPage';
import { getUser } from '../../utilities/users-service';
import LoginForm from '../../components/LoginForm.jsx'
import OrderPage from "../OrderPage/OrderPage";
import UserModal from "../../components/UserModal";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <>
      <h1>ticketmaster</h1>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<h1>The quick brown fox jumps over the lazy dog</h1>}
        />
        <Route path="/seatselect" element={<SeatSelect />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/events/:id/order" element={<OrderPage />} />
        <Route path="/signup/details" element={<UserModal />} />
      </Routes>
    </>
  );
}

export default App
