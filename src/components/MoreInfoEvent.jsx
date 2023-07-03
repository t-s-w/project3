import "./moreinfoevent.css"
export default function MoreInfoEvent(props) {
    
    return (props.trigger) ?  (
    <div className='popup'>
        <div className='popup-inner bg-white dark:bg-stone-700'>
            <button className='close-btn rounded-lg' onClick={() => props.setTrigger(false)}>X</button>
            <p>Please note: {props.event?.pleaseNote}</p>
        
            <hr/>
            <br/>
            <p>Ticket limit: {props.event?.ticketLimit?.info}</p>
            <p>Tickets are sold in {props?.event?.priceRanges[0]?.currency}</p>
        </div>
    </div>
    ) : "";
}