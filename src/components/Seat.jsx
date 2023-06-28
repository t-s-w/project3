
export default function Seat(props) {
    const { row, num, onClick, selected } = props;
    return <div className={`h-6 w-6 m-[2px] text-[0.7rem] rounded-full bg-orange-${selected ? 300 : 100} hover:bg-orange-300 flex place-items-center place-content-center select-none`} onClick={onClick}><p>{row + num}</p></div>
}