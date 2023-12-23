import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../Registering/Login.jsx"
import { Register } from '../Registering/Register.jsx'
import { WorkOrderList } from '../workorders/Home.jsx'
import { CreateWorkOrderForm } from '../workorders/CreateWork.jsx'
import MyBuildos from '../workorders/WorkDetails.jsx'
import AvailableContractors from './Contractors.jsx/ContractorsList.jsx'


export const ApplicationViews = ({ currentUser, setUser }) => {
    return (
        <>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route element={<Authorized currentUser={currentUser} setCurrentUser={setUser} />}>
                {/* Add Routes here */}
                <Route
                path="/"
                element={<WorkOrderList currentUser={currentUser} />}
                />
                <Route path="/creatework" element={<CreateWorkOrderForm currentUser={currentUser} />} />
                <Route
                path="/:workorderId"
                element={<MyBuildos currentUser={currentUser} />}
                />
                <Route path="/available-contractors" 
                element={<AvailableContractors currentUser={currentUser} />} 
                />
              </Route>
            </Routes>
        </>
      );
    };