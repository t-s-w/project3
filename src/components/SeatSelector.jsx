import Seat from './Seat'
import generate2DigitNums from '../utilities/generate-numbers'
import { useState } from 'react'

export default function SeatSelector() {
    const [selected, setSelected] = useState({ row: undefined, start: undefined, end: undefined })
    const [price, setPrice] = useState(0)
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

    function handleClick() {
      //post to collection
      console.log(selected);
      console.log(price);
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
                {seats.map((x) => (
                  <Seat
                    row={x.row}
                    num={x.num}
                    grade={x.grade}
                    key={x.row + x.num}
                    selected={
                      x.row === selected.row &&
                      parseInt(x.num) >= selected.start &&
                      parseInt(x.num) <= selected.end
                    }
                    onClick={() => handleClick(x.row, x.num, x.grade)}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col place-content-center">
          <p>Selected:</p>
          <p className="text-lg font-bold">
            {selected.row &&
              `${selected.row}${
                selected.start < 10 ? "0" + selected.start : selected.start
              }-${selected.row}${
                selected.end < 10 ? "0" + selected.end : selected.end
              }`}
          </p>
        </div>
        <div className="flex flex-col place-items-center place-content-center">
          <p>Total price: </p>
          <p className="text-lg font-bold">${price}</p>
        </div>
        <div className="flex flex-col place-content-center">
          <button className="bg-cyan-200" onClick={handleClick}>
            Purchase
          </button>
        </div>
      </div>
    );
}