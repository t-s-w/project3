import { Link, useNavigate } from "react-router-dom";
import LoginButton from './LoginButton.jsx';
import { useRef, useState } from "react";

export default function NavBar() {
  const [searchResults, setSearchResults] = useState();
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleSearch = async () => {
          const searchQuery = inputRef.current.value; 
          const response = await fetch(`/api/events/search/${searchQuery}`);
          const jsonData = await response.json();
          setSearchResults(jsonData);
          navigate('/events/search/:searchResults', {state:{searchResults: searchResults, searchQuery: searchQuery}});
  }
  return (
    <>
      <nav className="px-5 flex  bg-blue-800 py-5 rounded-b-md text-darkDefault font-extrabold place-items-center [&>:first-child]:mr-auto  ">
        <span className="font-['Merienda'] font-black italic text-2xl"><Link to="/">ticketmadam</Link></span>
        <ul className="pl-5 flex flex-row justify-end [&>*]:mx-8 flex-1">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/events/categories/categories">Categories</Link></li>
          <li><input placeholder="🔎 Search Bar" className="rounded-md bg text-sky-600" ref={inputRef}></input><button onClick={handleSearch} className="p-0.5">🔎</button></li>

        </ul>
        <LoginButton />
      </nav>
    </>
  );
}
