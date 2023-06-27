
export default function Seat(props) {
    const { name } = props;
    return <div className="h-6 w-6 text-xs rounded-full bg-orange-300 hover:bg-orange-100 flex place-items-center place-content-center select-none"><p>{name}</p></div>
}