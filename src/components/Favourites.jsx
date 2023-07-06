import { Link } from "react-router-dom";
import "./favourites.css";
import FavouritesCard from "./FavouritesCard";

export default function Favourites(props) {
  const { favourites, details } = props;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={"/star.png"} alt="Star" className="h-20 w-20 mb-4" />
        <h2 className="text-2xl font-extrabold text-left mb-4">
          {details.name}'s favorited events:
        </h2>
        <table className="table">
          <thead>
            <tr className="thread">
              <th></th>
              <th>Name</th>
              <th>Ticketing Information</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((fav) => (
              <FavouritesCard key={fav._id} fav={fav} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
