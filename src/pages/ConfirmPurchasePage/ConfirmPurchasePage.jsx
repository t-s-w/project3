import sendRequest from "../../utilities/send-request"
import PurchaseCard from '../../components/PurchaseCard'
import { useEffect, useState } from "react";

export default function ConfirmPurchasePage() {
    const [verifiedPurchase, setVerifiedPurchase] = useState(null);
    const purchaseToken = localStorage.getItem('purchaseToken');
    const [pageState, setPageState] = useState('idle');
    const [userDetails, setUserDetails] = useState({});
    const [disableButton, setDisableButton] = useState(true);

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

    function handleTnc(evt) {
        setDisableButton(!evt.target.checked)
    }

    return (pageState === 'idle') && verifiedPurchase ?
        <div className="w-full grid grid-cols-[3fr_1fr]">
            <div className="flex flex-col items-start [&>*]:my-4 w-full">
                <h1 className="">Confirm Purchase</h1>
                <PurchaseCard receipt={verifiedPurchase} />
                <p className="text-left">
                    <p className="text-3xl">Delivery information</p>
                    <p>Delivery of physical tickets will usually take 3 to 5 working days, but logistics delays may delay them for up to 3 weeks.</p>
                </p>
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
                <p className="text-left">
                    <p className="text-3xl">Terms & Conditions</p>
                    <p className="text-xs">
                        <ol className="list-decimal [&>li]:ml-4">
                            <li>
                                The terms and conditions of your ticket and policies applicable to use are updated to address COVID-19 and health & safety.
                                By purchasing a ticket, you accept these Terms and Conditions and policies applicable to use.
                                All ticket verification QR codes will appear 48 hrs prior to the scheduled start of the event.
                                All individual ticket prices are subject to variable and dynamic pricing, which provide fans with more price options based on changing factors that affect market demand.
                            </li>
                            <li>
                                This website is not real and will neither take your money nor deliver you any actual tickets.
                                Given the fact that there's no mechanism to ETL any new events into the database, by the time you're reading this the event selected is probably long over.
                                If you're someone testing out the website's functionality though, thanks for spending the time to follow through on the buying process so thoroughly!
                                Make sure to check the Purchase History for the functionality of managing your past purchases too.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </li>
                        </ol>
                    </p>
                </p>
            </div>
            <div className="[&>*]:my-4 flex flex-col justify-center items-center">
                <h2 className="text-3xl">Amount Due</h2>
                <p className="text-2xl font-black self-center">${verifiedPurchase.amountPaid}</p>
                <div><input type="checkbox" form="deliveryDetails" name="tnc" onChange={handleTnc} /> <label>I agree to the terms and conditions</label></div>
                <button disabled={disableButton} form="deliveryDetails" className="bg-blue-800 text-darkDefault disabled:bg-gray-400 enabled:hover:bg-blue-500 w-fit" >Confirm Purchase</button>
            </div >
        </div >
        :
        <h1>{pageState}</h1>

}