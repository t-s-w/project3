import LoginForm from "./LoginForm"

export default function NotLoggedIn() {
    return <div className="flex flex-col items-center">
        <h1>Not logged in!</h1>
        <h2>Log in now to buy tickets, add events to favourites and see personal recommendations</h2>
        <div className="w-60">

            <LoginForm />
        </div>
    </div>
}