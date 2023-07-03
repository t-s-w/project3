import sendRequest from "../../utilities/send-request";
import { useState, useEffect } from "react";
import PurchaseCard from '../../components/PurchaseCard'

export default function PurchaseHistory() {
    const [receipts, setReceipts] = useState([])
    const [pageStatus, setPageStatus] = useState(null)
    async function getReceipts() {
        try {
            setPageStatus('Loading...')
            const receipts = await sendRequest('/api/receipts/byUser')
            setReceipts(receipts)
            setPageStatus(null)
        } catch(err) {
            setPageStatus(err.message)
        }
    }
    useEffect(() => {
        getReceipts()
    },[])
    return pageStatus ? <h1>{pageStatus}</h1> : 
    
    <div className="flex flex-col [&>div]:my-2 place-items-center">
        <h1 className="mt-8">Purchase History</h1>
    {receipts.map(receipt => <PurchaseCard receipt={receipt} />)}
    </div>
    
}