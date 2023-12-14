import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'


export const ApplicationViews = ({ currentUser, setUser }) => {
    return (
        <>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route element={<Authorized currentUser={currentUser} />}>
                {/* Add Routes here */}
                <Route path="/" element={<Home currentUser={currentUser} />} />
              </Route>
            </Routes>
        </>
      );
    };