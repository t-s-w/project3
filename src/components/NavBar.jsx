import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="flex justify-around bg-blue-800 py-5 ">
        <span>
          <Link to="/events">Events</Link>
        </span>
        <span>Categories</span>
        <span>Venues</span>
        <span>FAQs</span>
        <span>
          <input placeholder="🔎 Search Bar"></input>
        </span>
        <span>My Account</span>
      </nav>
    </>
  );
}
