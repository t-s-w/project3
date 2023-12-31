import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoginButton from './LoginButton.jsx';
import { useEffect, useRef, useState } from "react";

export default function NavBar(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleSearch = async () => {
    const searchQuery = inputRef.current.value;
    const response = await fetch(`/api/events/search/${searchQuery}`);
    const jsonData = await response.json();
    props.setSearchResults(jsonData);
    navigate(`/events/search/${searchQuery}`, { state: { searchQuery: searchQuery } })
  }
  // const handleChange = async (event) => {
  //   let searchQuery;
  //   if (event.target.value) {
  //     searchQuery = {keyword: event.target.value}
  //   }else {
  //     searchQuery = undefined;
  //   }
  //   setSearchParams(searchQuery, {replace:true})
  //   }

  
  return (
    <>
      <nav className="px-5 flex  bg-blue-800 py-5 rounded-b-md text-darkDefault font-extrabold place-items-center [&>:first-child]:mr-auto  ">
        <span className="font-['Merienda'] font-black italic text-2xl">
          <Link to="/">ticketmadam</Link>
        </span>
        <ul className="pl-5 flex flex-row justify-end items-center [&>*]:mx-8 flex-1">
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/events/categories/categories">Categories</Link>
          </li>
          <li>
            <Link to="/foryou">For you</Link>
          </li>
          <li>
            <input
              value = {searchParams.keyword}
              placeholder="Search here"
              className="rounded-md bg text-sky-600 p-2"
              ref={inputRef}
              // onChange={handleChange}
            ></input>
            <button onClick={handleSearch} className="bg text-white-600 p-2">
              🔎
            </button>
          </li>
        </ul>
        <LoginButton />
      </nav>
    </>
  );
}
