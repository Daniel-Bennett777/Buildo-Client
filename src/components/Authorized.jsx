import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"

export const Authorized = ({ currentUser, setCurrentUser }) => {
  if (currentUser) {
    return <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}