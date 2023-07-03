import Seat from './Seat'
import generate2DigitNums from '../utilities/generate-numbers'
import { useState, useContext } from 'react'
import { UserContext} from '../pages/App/App.jsx';

export default function SeatSelector(props) {
    const { unavailableSeats, eventId, setBoughtReceipt } = props;
    const [selected, setSelected] = useState({ row: undefined, start: undefined, end: undefined })
    const [price, setPrice] = useState(0)
    const {user} = useContext(UserContext);
    const config1 = [{ row: "A", count: 10, grade: 1 },
    { row: "B", count: 11, grade: 1 },
    { row: "C", count: 12, grade: 1 },
    { row: "D", count: 13, grade: 2 },
    { row: "E", count: 14, grade: 2 },
    { row: "F", count: 15, grade: 2 },
    { row: "G", count: 15, grade: 2 },
    { row: "H", count: 15, grade: 3 },
    { row: "I", count: 15, grade: 3 },
    { row: "J", count: 15, grade: 3 }]
    const prices = [0, 50, 40, 30]

    function handleClick(row, num, grade) {
        const number = parseInt(num)
        if (row === selected.row && (selected.start - number === 1)) {
            setPrice(price + prices[grade])
            setSelected({ ...selected, start: number })
        } else if (row === selected.row && (selected.end - number === -1)) {
            setPrice(price + prices[grade])
            setSelected({ ...selected, end: number })
        } else {
            setPrice(prices[grade])
            setSelected({ row: row, start: number, end: number })
        }
    }

    async function handlePurchase() {
        //post to collection
        const body = {
            eventId: eventId,
            row: selected.row,
            startSeat: selected.start,
            endSeat: selected.end,
            amountPaid: price,
            physical:true,
            customerId: user._id
        }
        const options = {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch('/api/receipts/', options)

        if (response.ok) {
            response.json().then(setBoughtReceipt).catch(console.log)
            return 
        } else {
            const error = await response.json()
            console.log(error.message)
        }
    }

    return (
        <div className="grid grid-cols-3 grid-rows-4">
            <div className="config1 w-full flex flex-col place-items-center col-span-3 row-span-3">
                {config1.map((x) => {
                    const seats = generate2DigitNums(x.count).map((num) => ({
                        row: x.row,
                        num: num,
                        grade: x.grade,
                    }));
                    return (
                        <div key={x.row} className="flex flex-row place-items-center">
                            {seats.map((x) => {
                                const unavailable = unavailableSeats.has(x.row + x.num)
                                return <Seat
                                    unavailable={unavailable}
                                    row={x.row}
                                    num={x.num}
                                    grade={x.grade}
                                    key={x.row + x.num}
                                    selected={
                                        x.row === selected.row &&
                                        parseInt(x.num) >= selected.start &&
                                        parseInt(x.num) <= selected.end
                                    }
                                    onClick={unavailable ? undefined : () => handleClick(x.row, x.num, x.grade)}
                                />
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col place-content-center">
                <p>Selected:</p>
                <p className="text-lg font-bold">
                    {selected.row &&
                        `${selected.row}${selected.start < 10 ? "0" + selected.start : selected.start
                        }-${selected.row}${selected.end < 10 ? "0" + selected.end : selected.end
                        }`}
                </p>
            </div>
            <div className="flex flex-col place-items-center place-content-center">
                <p>Total price: </p>
                <p className="text-lg font-bold">${price}</p>
            </div>
            <div className="flex flex-col place-content-center">
                <button className="bg-cyan-200 dark:bg-cyan-800" onClick={handlePurchase}>
                    Purchase
                </button>
            </div>
        </div>
    );
}