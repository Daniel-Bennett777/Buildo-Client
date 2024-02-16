import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"
import { Footer } from "./Footer.jsx"

export const Authorized = ({ currentUser, setCurrentUser }) => {
  if (currentUser) {
    return <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </>
  }
  return <Navigate to='/login' replace />
}