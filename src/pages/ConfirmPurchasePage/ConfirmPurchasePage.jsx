import sendRequest from "../../utilities/send-request"

export default function ConfirmPurchasePage() {
    const purchaseToken = localStorage.getItem('purchaseToken');
    if(!purchaseToken) {
        return <>
        <h2>Something went wrong!</h2>
        </>
    }
}