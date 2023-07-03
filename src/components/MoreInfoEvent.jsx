import "./moreinfoevent.css"
export default function MoreInfoEvent(props) {
    
    return (props.trigger) ?  (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn rounded-full p-0.5 bg-red-600 text-white' onClick={() => props.setTrigger(false)}>x</button>
            <p>Please note: {props.event?.pleaseNote}</p>
        
            <hr/>
            <br/>
            <p>Ticket limit: {props.event?.ticketLimit?.info}</p>
            <p>Tickets are sold in {props?.event?.priceRanges[0]?.currency}</p>
        </div>
    </div>
    ) : "";
}