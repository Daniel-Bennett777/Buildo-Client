import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../Registering/Login.jsx"
import { Register } from '../Registering/Register.jsx'
import { WorkOrderList } from '../workorders/Home.jsx'
import { CreateWorkOrderForm } from '../workorders/CreateWork.jsx'
import {MyBuildos} from '../workorders/WorkDetails.jsx'
import {AvailableContractors} from '../Contractors.jsx/ContractorsList.jsx'
import {ContractorMyBuildos} from '../workorders/ContractorWorkDetails.jsx'
import {ReviewForm} from '../Contractors.jsx/ReviewContractorForm.jsx'
import {ReviewsList} from '../Contractors.jsx/SeeAllReviews.jsx'
import { About } from '../About/About.jsx'


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
                element={<MyBuildos currentUser={currentUser}  />}
                />
                <Route
                path="/my-buildos" // Add a new route for contractor my-buildos
                element={<ContractorMyBuildos currentUser={currentUser} />}
                />
                <Route path="/available-contractors" 
                element={<AvailableContractors currentUser={currentUser} />} 
                />
                <Route path="/createreview/:contractorId" 
                element={<ReviewForm currentUser={currentUser} />} 
                />
                <Route
                path="/reviews/:contractorId" // Use a dynamic parameter for the contractor ID
                element={<ReviewsList currentUser={currentUser} />}
                />
                <Route path="/about" element={<About />} /> {/* Add the About route */}
              </Route>
            </Routes>
        </>
      );
    };