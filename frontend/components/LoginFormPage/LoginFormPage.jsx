import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import * as sessionActions from '../../src/store/session'


const LoginFormPage = () => {

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')

    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch()


    if (sessionUser) return <Navigate to="/" replace={true} />;

function onSubmit(e){
e.preventDefault()


const user = {
    credential,
    password
}


return dispatch(sessionActions.login(user))





}


    return (
        <>
        <form onSubmit={onSubmit} >
        <label htmlFor="credential">Username or Email:</label>
        <input name="credential" type="text" value={credential} onChange={e => {setCredential(e.target.value)}}/>
        <label htmlFor="password">Password:</label>
        <input name="password" type="text" value={password} onChange={e => {setPassword(e.target.value)}}/>
        <button type="submit">Login</button>
        </form>


    
        </>
    )
}

export default LoginFormPage