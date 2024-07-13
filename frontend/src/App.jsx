import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as sessionActions from './store/session'
import { useDispatch } from 'react-redux'
import SignupFormPage from "../components/SignupFormPage/SignupFormPage";
import Navigation from "../components/Navigation/Navigation";


function App() {
 
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded ] = useState(false)
  
useEffect(() =>{

  return async () =>{
  let user = await dispatch(sessionActions.restoreUser()).then(()=>{
    setIsLoaded(true)
  });
 
 if(user) return <Navigate to='/' replace= {true}/>
 }
},[dispatch])

//Todo: research proper way to create condition for rendering routes based on session loaded with react router v6 syntax
  return (
    <>
      <BrowserRouter>
      <Navigation isLoaded={isLoaded}/>
      <Routes>
          <Route path="/" element={<h1>Welcome!</h1>} />
          <Route path="/signup" element={<SignupFormPage/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
