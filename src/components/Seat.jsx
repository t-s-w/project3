
const gradeColours = [
    ['bg-slate-500 dark:bg-slate-600', 'bg-slate-200 hover:bg-slate-400'],
    ['bg-red-500 dark:bg-red-600', 'bg-red-200 hover:bg-red-400 dark:hover:bg-red-700 dark:bg-red-950'],
    ['bg-amber-500 dark:bg-amber-600', 'bg-amber-200 hover:bg-amber-400 dark:hover:bg-amber-700 dark:bg-amber-950'],
    ['bg-emerald-500 dark:bg-emerald-600', 'bg-emerald-200 hover:bg-emerald-400 dark:hover:bg-emerald-700 dark:bg-emerald-950'],
    ['bg-sky-500 dark:bg-sky-600', 'bg-sky-200 hover:bg-sky-400 dark:hover:bg-sky-700 dark:bg-sky-900'],
    ['bg-indigo-500 dark:bg-indigo-600', 'bg-indigo-200 hover:bg-indigo-400 dark:hover:bg-indigo-700 dark:bg-indigo-900']
]

export default function Seat(props) {
    const { row, num, onClick, selected, grade, unavailable } = props;
    const baseStyle = 'h-8 w-8 m-[2px] text-[0.7rem] rounded-md border-slate-400 border-2 p-2 flex place-items-center place-content-center select-none '
    const colourStyle = gradeColours[grade][1 - selected]
    const unavailableStyle = unavailable ? ' bg-stone-400 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-600 ' : ''
    const classes = baseStyle + colourStyle + unavailableStyle
    console.log(classes)
    return <div className={classes} onClick={onClick} > <p>{row + num}</p></div >
}