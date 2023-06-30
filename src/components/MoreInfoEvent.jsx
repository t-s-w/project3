export default function MoreInfoEvent(props) {
    return (props.trigger) ?  (
    <>
    Popout
    <button onClick={() => props.setTrigger(false)}>X</button>
    </>
    ) : "";
}