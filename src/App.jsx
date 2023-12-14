import { useState } from 'react'
import './index.css'
import { ApplicationViews } from './components/ApplicationViews';


function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (newUser) => {
    // newUser is now expected to be an object, not a string
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  }


  return (
    <>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <ApplicationViews currentUser={currentUser} setUser={setUser} />
    </>
  )
}

export default App