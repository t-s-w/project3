import Seat from './Seat'
import generate2DigitNums from '../utilities/generate-numbers'
import { useState, useContext } from 'react'
import { UserContext } from '../pages/App/App.jsx';
import sendRequest from '../utilities/send-request';
import { useNavigate } from 'react-router-dom';

export default function SeatSelector(props) {
  const navigate = useNavigate();
  const { unavailableSeats, eventId, config1, prices } = props;
  const [selected, setSelected] = useState({ row: undefined, start: undefined, end: undefined })
  const [price, setPrice] = useState(0);
  const { user } = useContext(UserContext);

  function handleClick(row, num, grade) {
    const number = parseInt(num);
    if (row === selected.row && selected.start - number === 1) {
      setPrice(price + prices[grade]);
      setSelected({ ...selected, start: number });
    } else if (row === selected.row && selected.end - number === -1) {
      setPrice(price + prices[grade]);
      setSelected({ ...selected, end: number });
    } else {
      setPrice(prices[grade]);
      setSelected({ row: row, start: number, end: number });
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
      physical: true,
      customerId: user._id,
    };
    try {
      const purchaseToken = await sendRequest("/api/receipts/verify", "POST", body);
      localStorage.setItem('purchaseToken', purchaseToken);
      navigate('/confirmPurchase')
    }
    catch (err) {
      console.log(err.message);
    }
  }

  return (
    (config1 && prices) ?
      <div className="grid grid-cols-3 grid-rows-4">
        <div className="config1 w-full flex flex-col place-items-center col-span-3 row-span-3">
          <div className="bg-pink-500 dark:bg-pink-500 p-10">STAGE</div>
          {config1.map((x) => {
            const seats = generate2DigitNums(x.count).map((num) => ({
              row: x.row,
              num: num,
              grade: x.grade,
            }));
            return (
              <div key={x.row} className="flex flex-row place-items-center">
                {seats.map((x) => {
                  const unavailable = unavailableSeats.has(x.row + x.num);
                  return (
                    <Seat
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
                      onClick={
                        unavailable
                          ? undefined
                          : () => handleClick(x.row, x.num, x.grade)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col place-content-center text-left">
          <p className="mb-2">
            You are allowed to book only consecutive seats in the same row.
          </p>
          <p className="font-bold">Seat prices:</p>
          <p className="[&>span]:mx-1">
            <span className="bg-red-200 dark:bg-red-950 rounded-full px-4 py-1 w-fit">${prices[1]}</span>
            <span className="bg-amber-200 dark:bg-amber-950 rounded-full px-4 py-1 w-fit">${prices[2]}</span>
            <span className="bg-emerald-200 dark:bg-emerald-950 rounded-full px-4 py-1 w-fit">${prices[2]}</span>
            <span className="bg-stone-400 dark:bg-stone-600 rounded-full px-4 py-1 w-fit">Unavailable</span>
          </p>
        </div>
        <div className="flex flex-col place-items-center place-content-center items-center">
          <p>Seats selected</p>
          <p className="text-lg font-bold">
            {selected.row &&
              `${selected.row}${selected.start < 10 ? "0" + selected.start : selected.start
              }-${selected.row}${selected.end < 10 ? "0" + selected.end : selected.end
              }`}
          </p>
          <p>Total price</p>
          <p className="text-lg font-bold">
            {price > 0 && `$${price.toLocaleString()}`}
          </p>
        </div>
        <div className="flex flex-col place-content-center items-center">
          <button
            className="bg-blue-200 dark:bg-blue-800 w-fit"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
      </div>
      :
      <h1>Loading...</h1>
  );
}