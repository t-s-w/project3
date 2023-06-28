import Seat from './Seat'
import generate2DigitNums from '../utilities/generate-numbers'
import { useState } from 'react'

export default function SeatSelector() {
    const [selected, setSelected] = useState({ row: undefined, start: undefined, end: undefined })

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

    function handleClick(row, num) {
        const number = parseInt(num)
        if (row === selected.row && (selected.start - number === 1)) {
            setSelected({ ...selected, start: number })
        } else if (row === selected.row && (selected.end - number === -1)) {
            setSelected({ ...selected, end: number })
        } else {
            setSelected({ row: row, start: number, end: number })
        }
    }

    return <div className="grid grid-cols-3 grid-rows-2">
        <div className="config1 w-full flex flex-col place-items-center col-span-3">{
            config1.map(x => {
                const seats = generate2DigitNums(x.count).map(num => ({ row: x.row, num: num }))
                return <div key={x.row} className="flex flex-row place-items-center">{
                    seats.map(x => <Seat row={x.row} num={x.num} key={x.row + x.num} selected={x.row === selected.row && parseInt(x.num) >= selected.start && parseInt(x.num) <= selected.end} onClick={() => handleClick(x.row, x.num)} />)
                }</div>
            })
        }</div>
        <div className="flex flex-row place-items-center"><p>Selected: <br />{selected.row && `${selected.row}${selected.start}-${selected.row}${selected.end}`}</p></div>
    </div>
}