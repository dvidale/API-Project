import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import { useEffect } from "react";
import * as sessionActions from './store/session'
import { useDispatch } from 'react-redux'


function App() {
 
  const dispatch = useDispatch()
  
useEffect(() =>{

  return async () =>{
  let user = await dispatch(sessionActions.restoreUser())
 
 if(user) return <Navigate to='/' replace= {true}/>
 }
},[dispatch])


  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<h1>Welcome!</h1>} />
          <Route path="/login" element={<LoginFormPage />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
