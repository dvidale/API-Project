import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useModal } from "../../src/context/Modal"

import * as sessionActions from '../../src/store/session'
import './LoginForm.css'

const LoginFormModal = () => {

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch()

  const { closeModal } = useModal();

  useEffect(()=>{

    let err = {}

    if(credential.length < 4) err.credential = "Username or email is too short"
    if(password.length < 6) err.password = "Password is too short"

    setErrors(err)
    


  },[credential, password])


   
const onSubmit = (e) => {
  
e.preventDefault()
setErrors({});

const user = { credential, password }

return dispatch(sessionActions.login(user)).then(closeModal).catch(
    async (res) => {
      const data = await res.json();
    
      if (data && data.errors) setErrors(data.errors);
      
      alert(`${data.errors.message}`)
    });
}


    return (
        <>
        <h1>Login</h1>
        <form onSubmit={onSubmit} >
        <label htmlFor="credential">Username or Email:</label>
        <input name="credential" 
        type="text" 
        value={credential} 
        onChange={e => {setCredential(e.target.value)}} 
        required />
        <label htmlFor="password">
            Password:
            </label>
        <input 
        name="password" 
        type="password" 
        value={password} 
        onChange={e => {setPassword(e.target.value)}} 
        required />
        {errors.credential && (<p>{errors.credential}</p>)}
        <button type="submit" disabled={Object.keys(errors).length} >Log In</button>
        </form>


    
        </>
    )
}

export default LoginFormModal