import { useState } from "react"
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
   
const onSubmit = (e) => {
  

e.preventDefault()
setErrors({});

const user = { credential, password }
//Todo: double check errors are being displayed properly

return dispatch(sessionActions.login(user)).then(closeModal).catch(
    async (res) => {
        errors
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
      
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
        <button type="submit">Log In</button>
        </form>


    
        </>
    )
}

export default LoginFormModal