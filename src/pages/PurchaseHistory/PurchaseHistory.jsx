import sendRequest from "../../utilities/send-request";
import { useState, useEffect } from "react";
import PurchaseCard from '../../components/PurchaseCard'
import ConfirmCancel from '../../components/ConfirmCancel'

export default function PurchaseHistory() {
    const [cancelBooking, setCancelBooking] = useState(null)
    const [receipts, setReceipts] = useState([])
    const [pageStatus, setPageStatus] = useState(null)
    const [refreshPage, setRefreshPage] = useState(0)
    async function getReceipts() {
        try {
            setPageStatus('Loading...')
            const receipts = await sendRequest('/api/receipts/byUser')
            setReceipts(receipts)
            setPageStatus(null)
        } catch (err) {
            setPageStatus(err.message)
        }
    }
    useEffect(() => {
        getReceipts()
    }, [refreshPage])
    return pageStatus ? <h1>{pageStatus}</h1> :
        <>
            <div className="flex flex-col [&>div]:my-2 place-items-center">
                <h1 className="mt-8">Purchase History</h1>
                {receipts.map(receipt => <div key={receipt._id} className="w-full flex flex-row justify-center place-items-center [&>*]:mx-4"><PurchaseCard receipt={receipt} /><button className="h-fit" onClick={() => setCancelBooking(receipt)}>Cancel</button></div>)}
            </div>
            {cancelBooking ? <ConfirmCancel receipt={cancelBooking} setCancelBooking={setCancelBooking} setRefreshPage={setRefreshPage} /> : null}
        </>

}