import starImage from "../../dist/star.png";

export default function Favourites() {
  function handleClick() {
    console.log("add to fav");
  }

  return (
    <div className="flex justify-end">
      <button
        onClick={handleClick}
        className="bg-transparent flex items-center"
      >
        <img src={starImage} alt="Star" className="h-20 w-20" />
      </button>
    </div>
  );
}
