import { NavLink } from "react-router"
import ReactRoutes from "./router"

function App() {
  return (
    <div className="h-screen">
      {/* NAVIGATION */}
      <nav className="fixed bg-gray-800 h-screen w-[50px] z-10 hover:w-[200px] transition-all duration-500">
          <ul className="flex flex-col">
              <li className="text-white p-4 overflow-hidden text-ellipsis">
                <NavLink to="/">Hangman</NavLink>
              </li>
              <li className="text-white p-4 overflow-hidden text-ellipsis">
                <NavLink to="/weather">Weather</NavLink>
              </li>
          </ul>
      </nav>

      {/* ROUTES */}
      <ReactRoutes/>
    </div>
  )
}

export default App