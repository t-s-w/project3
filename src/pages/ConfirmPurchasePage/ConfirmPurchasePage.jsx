import sendRequest from "../../utilities/send-request"
import PurchaseCard from '../../components/PurchaseCard'
import { useEffect, useState } from "react";

export default function ConfirmPurchasePage() {
    const [verifiedPurchase, setVerifiedPurchase] = useState(null);
    const purchaseToken = localStorage.getItem('purchaseToken');
    const [pageState, setPageState] = useState('idle');
    const [userDetails, setUserDetails] = useState({});

    async function embedEvent() {
        try {
            setPageState('Loading...')
            const decodedToken = JSON.parse(atob(purchaseToken.split('.')[1])).verifiedReceipt
            await sendRequest('/api/userDetails/getOneUser').then(setUserDetails)
            await fetch(`/api/events/${decodedToken.eventId}`).then(x => x.json()).then(x => { console.log(x); setVerifiedPurchase({ ...decodedToken, eventId: x }) }).catch(() => { throw new Error('Event fetching failed') })
            setPageState('idle')
        } catch (err) {
            setPageState(err.message)
        }

    }

    useEffect(() => {
        embedEvent()
    }, [])

    async function handleClick(evt) {
        evt.preventDefault()
        console.log(evt.target.address.value)
    }

    return (pageState === 'idle') && verifiedPurchase ?
        <div className="w-full grid grid-cols-[3fr_1fr]">
            <div className="flex flex-col items-start [&>*]:m-4 w-full">
                <h1>Confirm Purchase</h1>
                <PurchaseCard receipt={verifiedPurchase} />
                <p className="text-3xl">Delivery information</p>
                <form id="deliveryDetails" onSubmit={handleClick}>
                    <fieldset className="grid grid-cols-2 text-left [&>*]:my-2 [&>input]:border-2 [&>input]:border-solid [&>input]:border-stone-500 [&>input]:rounded-lg items-start">
                        <label>Name:</label>
                        <input type="text" name="name" placeholder={userDetails.name} />

                        <label>Contact No:</label>
                        <input type="text" name="contactNo" placeholder={userDetails.contactNo} />

                        <label>Address:</label>
                        <input type="text" name="address" placeholder={userDetails.address} />

                    </fieldset>
                </form>
            </div>
            <div className="[&>*]:my-4">
                <h2 className="text-3xl">Amount Due</h2>
                <p className="text-2xl font-black">${verifiedPurchase.amountPaid}</p>
                <button form="deliveryDetails" className="bg-blue-800 text-darkDefault hover:bg-blue-500" >Confirm Purchase</button>
            </div>
        </div>
        :
        <h1>{pageState}</h1>

}