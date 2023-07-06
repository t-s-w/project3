import "./favouritescard.css";

export default function FavouritesCard(props) {
  const { favourites, details } = props;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={"/star.png"} alt="Star" className="h-10 w-10 mr-2" />
        <div className="text-2xl font-extrabold">
          {details.name}'s favorites:
        </div>
        <div name="favs">
          {favourites.map((fav) => (
            <div key={fav._id} className="">
              {fav.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
