import Seat from './Seat'
import generate2DigitNums from '../utilities/generate-numbers'

export default function SeatSelector() {
    const config1 = [{ row: "A", count: 10 },
    { row: "B", count: 11 },
    { row: "C", count: 12 },
    { row: "D", count: 13 },
    { row: "E", count: 14 },
    { row: "F", count: 15 },
    { row: "G", count: 15 },
    { row: "H", count: 15 },
    { row: "I", count: 15 },
    { row: "J", count: 15 }]

    return <div className="config1 flex flex-col place-items-center">{config1.map(x => {
        const seats = generate2DigitNums(x.count).map(num => x.row + num)
        return <div key={x.row} className="flex flex-row place-items-center">{seats.map(x => <Seat name={x} key={x} />)}</div>
    })}</div>
}