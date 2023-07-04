import sendRequest from "../../utilities/send-request"

export default function ConfirmPurchasePage() {
    try {
        const purchaseToken = localStorage.getItem('purchaseToken');
        const verifiedPurchase = atob(purchaseToken.split('.')[1])
    }
    catch {
            return <>
        <h2>Something went wrong!</h2>
        </>
}
        return <>
        <h1>Confirm Purchase</h1>
        </>
    
}