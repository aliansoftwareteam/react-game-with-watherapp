import {Route, Routes} from "react-router"
import Hangman from "../component/Hangman/index.jsx"
import Weather from "../component/Weather/index.js"

export default function ReactRoutes() {
    return (
        <Routes>
            <Route path="/" Component={Hangman}/>
            <Route path="/weather" Component={Weather}/>
        </Routes>
    )
}