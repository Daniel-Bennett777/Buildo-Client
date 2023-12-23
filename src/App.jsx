import { useState } from 'react';
import './index.css';
import { ApplicationViews } from './components/ApplicationViews';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (newUser) => {
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  return (
    <>
      <ApplicationViews currentUser={currentUser} setUser={setUser} />
    </>
  );
}

export default App;