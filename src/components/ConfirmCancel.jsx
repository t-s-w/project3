import PurchaseCard from './PurchaseCard'
import sendRequest from '../utilities/send-request';
import { useEffect, useState } from 'react'

export default function ConfirmCancel(props) {
    const { receipt, setCancelBooking, setRefreshPage, refreshPage } = props;
    const [error, setError] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    useEffect(() => {
        setCancelled(false)
    }, [receipt])
    async function handleDelete() {
        try {
            const response = await sendRequest(`/api/receipts/${receipt._id}`, "DELETE")
            setError('Booking cancelled')
            setCancelled(true)
        }
        catch (err) {
            setError(err.message);
        }
    }
    return <div className="bg-[rgba(50,50,50,0.9)] text-darkDefault [&>a]:p-4 [&>*]:my-3 [&>a]:rounded-md fixed top-0 left-0 flex flex-col place-items-center justify-center w-full min-h-full">
        {error ? <>
            <h1>{error}</h1>
            <button className="bg-blue-800 hover:bg-blue-400 hover:text-inherit" onClick={() => { if (cancelled) { setRefreshPage(refreshPage + 1) }; setCancelBooking(null) }}>Back</button>
        </>
            :
            <>
                <h1 className="font-bold">Are you sure?</h1>
                <p>Refunds may take up to 1 week.</p>
                <PurchaseCard receipt={receipt} />
                <button className="bg-blue-800 hover:bg-blue-400 hover:text-inherit" onClick={() => setCancelBooking(null)}>Never mind</button>
                <button className="bg-stone-800 hover:bg-red-950 hover:text-inherit" onClick={handleDelete}>Yes, please cancel this booking</button>
            </>}
    </div>
}