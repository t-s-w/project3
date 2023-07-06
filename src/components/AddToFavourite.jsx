import { UserContext } from "../pages/App/App";
import { useContext, useEffect, useState } from "react";
import sendRequest from "../utilities/send-request";
import { Link } from "react-router-dom";

export default function AddToFavourite({ event, favourites }) {
  const { user, setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [favourited, setFavourited] = useState(false);

  console.log(event);
  console.log("fav", favourites);

  const handleClick = async function () {
    if (favourites.includes(event._id)) {
      setFavourited(true);
      return;
    }
    try {
      const response = await sendRequest("/api/userDetails", "PATCH", {
        favourites: event._id,
      });
      console.log(response); // Process the response data as needed
      setSuccess(true);
      console.log("added");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    user && (
      <div className="flex justify-end">
        <button
          onClick={handleClick}
          className="bg-transparent flex items-center"
        >
          <img src={"/star.png"} alt="Star" className="h-10 w-10" />
        </button>
        {success && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSuccess(false)}
              >
                x
              </button>

              <h1 className="font-bold text-xl mb-4">Added to favourites!</h1>

              <div className="text-center">
                <Link to="/foryou">
                  <button className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                    View favourites
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {favourited && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFavourited(false)}
              >
                x
              </button>

              <h1 className="font-bold text-xl m-5">
                -ˋˏ This event is already favourited! ˊˎ-
              </h1>

              <div className="text-center">
                <Link to="/foryou">
                  <button className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                    View favourites
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
