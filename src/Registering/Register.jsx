import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../managers/RegisterManager";

export const Register = ({ setUser }) => {
  const [userType, setUserType] = useState("customer");
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const bio = useRef();
  const profile_image_url = useRef();
  const stateName = useRef();
  const countyName = useRef();
  const isContractor = useRef(false); // Default to false for customers
  const qualifications = useRef(); // For customers, this can be left blank
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isContractorValue = userType === "contractor";
    const qualificationsValue = userType === "contractor" ? qualifications.current.value : undefined;
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        profile_image_url: profile_image_url.current.value,
        state_name: stateName.current.value,
        county_name: countyName.current.value,
        is_contractor: isContractorValue,
        qualifications: qualificationsValue,
      };
  

      registerUser(newUser).then((res) => {
        if ("token" in res && res.token) {
          setUser(res);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };
return (
  <section className="login-container pt-[5%] pl-10 pr-10 flex items-center justify-center">
  <form className="mb-4" onSubmit={handleRegister}>
    <div className="mb-4">
      <label htmlFor="userType" className="block text-md font-medium text-gray-700 mb-2">
        User Type
      </label>
      <div className="control">
        <label className="radio">
          <input
            type="radio"
            id="userType"
            name="userType"
            value="customer"
            checked={userType === "customer"}
            onChange={handleUserTypeChange}
          />
          Customer
        </label>
        <label className="radio">
          <input
            type="radio"
            name="userType"
            value="contractor"
            checked={userType === "contractor"}
            onChange={handleUserTypeChange}
          />
          Contractor
        </label>
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="firstName" 
      className="block text-md font-medium text-gray-700 mb-2">
        First Name
      </label>
      <input type="text" id = "firstName" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="firstName" ref={firstName} />
    </div>

    <div className="mb-4">
      <label htmlFor="lastName" 
      className="block text-md font-medium text-gray-700 mb-2">
        Last Name
      </label>
      <input type="text" id="lastName" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="lastName" ref={lastName} />
    </div>
    <div className="mb-4">
    <label htmlFor="username" className="block text-md font-medium text-gray-700 mb-2">
    Username
    </label>
    <input
        type="text"
        id="username"
        autoComplete="off"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="username"
        ref={username}/>
    </div>
    <div className="mb-4">
      <label htmlFor="email"
      className="block text-md font-medium text-gray-700 mb-2">
        Email
      </label>
      <input type="text" id="email"autoComplete="off" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="email" 
      ref={email} />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">
        Password
      </label>
      <input type="password" id ="password"autoComplete="off" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name="password" 
      ref={password} />
    </div>

    <div className="mb-4">
      <label htmlFor="verifyPassword" className="block text-md font-medium text-gray-700 mb-2">
        Verify Password
      </label>
      <input type="password" id ="verifyPassword" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
      name="verifyPassword" 
      ref={verifyPassword} />
    </div>

    <div className="mb-6">
      <label htmlFor="bio" className="block text-md font-medium text-gray-700 mb-2">
        Bio
      </label>
      <textarea id="bio" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="bio" 
      ref={bio}></textarea>
    </div>

    <div className="mb-6">
      <label htmlFor="profile_image_url" className="block text-md font-medium text-gray-700 mb-2">
        Profile Picture
      </label>
      <input type="text" id="profile_image_url"  
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="profile_image_url" 
      ref={profile_image_url} />
    </div>

    <div className="mb-4">
      <label htmlFor="stateName" className="block text-md font-medium text-gray-700 mb-2">
        State Name
      </label>
      <input type="text" id="stateName" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="stateName" 
      ref={stateName} />
    </div>

    <div className="mb-4">
      <label htmlFor="countyName" className="block text-md font-medium text-gray-700 mb-2">
        County Name
      </label>
      <input type="text" id="countyName"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="countyName" 
      ref={countyName} />
    </div>

    {userType === "contractor" && (
      <div className="mb-4">
        <label htmlFor="qualifications"className="block text-md font-medium text-gray-700 mb-2">
          Qualifications
        </label>
        <input type="text" id="qualifications" 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
        name="qualifications" 
        ref={qualifications} />
      </div>
    )}

    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">
          Submit
        </button>
      </div>
      <div className="control">
        <Link to="/login" className="button is-link is-light">
          Cancel
        </Link>
      </div>
    </div>
  </form>

  <dialog ref={passwordDialog} className="rounded-lg p-4 bg-white shadow-xl">
    <h3 className="text-lg font-bold">Password Mismatch</h3>
    <p className="py-4">
      The passwords you entered do not match. Please try again.
    </p>
    <button
      onClick={() => passwordDialog.current.close()}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Close
    </button>
  </dialog>
</section>
);
};