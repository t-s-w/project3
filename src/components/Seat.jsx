
const gradeColours = [
    ['bg-slate-400', 'bg-slate-200 hover:bg-slate-400'],
    ['bg-red-400', 'bg-red-200 hover:bg-red-400'],
    ['bg-amber-400', 'bg-amber-200 hover:bg-amber-400'],
    ['bg-emerald-400', 'bg-emerald-200 hover:bg-emerald-400'],
    ['bg-sky-400', 'bg-sky-200 hover:bg-sky-400'],
    ['bg-indigo-400', 'bg-indigo-200 hover:bg-indigo-400']
]

export default function Seat(props) {
    const { row, num, onClick, selected, grade } = props;
    const baseStyle = 'h-8 w-8 m-[2px] text-[0.7rem] rounded-md border-slate-400 border-2 p-2 flex place-items-center place-content-center select-none '
    const colourStyle = gradeColours[grade][1 - selected]
    const classes = baseStyle + colourStyle
    console.log(classes)
    return <div className={classes} onClick={onClick} > <p>{row + num}</p></div >
}