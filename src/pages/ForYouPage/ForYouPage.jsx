import { useContext, useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import FavouritesCard from "../../components/FavouritesCard";
import { UserContext } from "../App/App";
import Recommended from "../../components/RecommendedCard";

export default function ForYouPage() {
  const { user } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const [details, setDetails] = useState({});

  //get user
  async function getOneUserDetail() {
    const response = await sendRequest(`/api/userDetails/getOneUser`);
    setDetails(response);
  }
  useEffect(() => {
    getOneUserDetail().then(console.log);
  }, []);

  //get favourites
  async function getFavourites() {
    const response = await sendRequest(`/api/userDetails/favourites`);
    setFavourites(response);
    console.log("favourites", response);
  }
  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      <h1 className="text-l font-bold m-5">
        <div> Welcome back, {details.name}! </div>
      </h1>
      <FavouritesCard details={details} favourites={favourites} />
      <Recommended details={details} favourites={favourites} />
    </>
  );
}
