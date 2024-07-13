import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import * as sessionActions from '../../src/store/session'
import './LoginForm.css'

const LoginFormPage = () => {

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch()

    if (sessionUser){ return <Navigate to="/" replace={true} />;}
   
const onSubmit = (e) => {
  

e.preventDefault()
setErrors({});

const user = { credential, password }
//Todo: double check errors are being displayed properly

return dispatch(sessionActions.login(user)).catch(
    async (res) => {
        errors
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
      setCredential('');
      setPassword('');
    });
}


    return (
        <>
        <h1>Login</h1>
        <form onSubmit={onSubmit} >
        <label htmlFor="credential">Username or Email:</label>
        <input name="credential" type="text" value={credential} onChange={e => {setCredential(e.target.value)}} required />
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" value={password} onChange={e => {setPassword(e.target.value)}} required />
        <button type="submit">Log In</button>
        </form>


    
        </>
    )
}

export default LoginFormPage