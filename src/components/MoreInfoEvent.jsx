import "./moreinfoevent.css"
export default function MoreInfoEvent(props) {
    
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner bg-white dark:bg-slate-800">
          <button
            className="close-btn rounded-lg"
            onClick={() => props.setTrigger(false)}
          >
            X
          </button>
          <div className="m-5 text-left">
            <h1 className="text-extrabold text-xl">ⓘ More information</h1>
            <br />
            <div className="m-5">
              <p>Ticket limit: {props.event?.ticketLimit?.info}</p>
              <p>
                Tickets are sold in{" "}
                <b>{props?.event?.priceRanges[0]?.currency}.</b>
              </p>{" "}
            </div>
            <hr />
            <div className="m-5">
              <p>***Please note: {props.event?.pleaseNote}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
}