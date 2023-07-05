import starImage from "../../dist/star.png";
import { UserContext } from "../pages/App/App";
import { useContext, useState } from "react";
import sendRequest from "../utilities/send-request";

export default function Favourites({ event }) {
  const { user, setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  console.log(event);

  const handleClick = async function () {
    const eventId = event._id;

    try {
      const response = await sendRequest("/api/userDetails", "PATCH", {
        favourites: eventId,
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
          <img src={starImage} alt="Star" className="h-20 w-20" />
        </button>
      </div>
    )
  );
}
