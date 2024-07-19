import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useModal } from "../../src/context/Modal"

import * as sessionActions from '../../src/store/session'
import './LoginForm.css'

const LoginFormModal = () => {

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
   
    const [errors, setErrors] = useState({});
const [serverError, setServerError] = useState({})
    const dispatch = useDispatch()

  const { closeModal } = useModal();

  useEffect(()=>{

    let err = {}

    if(!credential && !password) setServerError({})

    if(credential.length < 4) err.credentials = "Username or email is too short"
    if(password.length < 6) err.passwords = "Password is too short"

    setErrors(err)
    


  },[credential, password])

  const demoUserLogin = (e) =>{
    
setCredential('DemoUser');
setPassword('password');

onSubmit(e, credential, password)

  }

   
const onSubmit = (e) => {
  
e.preventDefault()
setErrors({});

const user = { credential, password }

return dispatch(sessionActions.login(user)).then(closeModal).catch(
    async (res) => {
      const data = await res.json();
    
      if (data && data.errors) setServerError(data.errors);
      // console.log("<<data from login error>>", data.errors);
      // console.log(">>>>> serverError object", serverError);
      // alert(`${data.errors.message}`)
     
    });
}


    return (
        <>
        <div className="modal-window">
       
        <form onSubmit={onSubmit} >
       
       <div className="input-fields-container">
       <h1>Log In</h1>
       {Object.keys(serverError).length > 0 && <p className="errors">{serverError.message}</p>}
        <input className="form-field"
        name="credential" 
        placeholder="Username or Email"
        type="text" 
        value={credential} 
        onChange={e => {setCredential(e.target.value)}} 
        required />
     
        <input className="form-field"
        name="password" 
        placeholder=" Password"
        type="password" 
        value={password} 
        onChange={e => {setPassword(e.target.value)}} 
        required />
        <button id="login-button" type="submit" disabled={Object.keys(errors).length} >Log In</button>
      <button id="demo-user-login" onClick={demoUserLogin}>Demo User</button>

        </div>
        </form>
        </div>

    
        </>
    )
}

export default LoginFormModal