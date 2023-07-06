import starImage from "../../dist/star.png";

export default function Recommended(props) {
  const { favourites, details } = props;

  return (
    <>
      <div className="flex flex-col items-left justify-center h-screen">
        <div>Recommended based on your favourites</div>
      </div>
    </>
  );
}
