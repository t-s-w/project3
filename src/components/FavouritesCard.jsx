import starImage from "../../dist/star.png";

export default function FavouritesCard(props) {
  const { favourites, details } = props;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={starImage} alt="Star" className="h-10 w-10 mr-2" />
        <div className="text-2xl font-extrabold">
          {details.name}'s favorites:
        </div>
        <div name="favs">
          {favourites.map((fav) => (
            <div
              key={fav._id}
              className="card w-full flex flex-row justify-center place-items-center [&>*]:mx-4"
            >
              {fav.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
