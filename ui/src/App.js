import { useState, useEffect, useContext, createContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './views/navbar.js'
import Signin from './views/signin.js'
import Signup from './views/signup.js'
import Home from './views/table.js'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState()
  


  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Signin />}/> 
          <Route path="/signup" element={<Signup />}/> 
        </Routes>

      </UserContext.Provider>
    </>
  );
}

export default App;
