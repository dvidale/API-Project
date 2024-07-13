import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../src/store/session'
import { Navigate } from "react-router-dom";

const SignupFormPage = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState({});

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  //Todo: Make sure the password validation behavior satisfies the scorecard
  useEffect(()=>{
    const errors = {};

    if (password !== confirmPassword){
        errors.password = "passwords do not match";
        setErr(errors);
    }else{
        setErr({})
    }

},[password, confirmPassword])

  if (sessionUser){ return <Navigate to="/" replace={true} />;}

  function submitHandler(e) {
 
    e.preventDefault();

    
      

    const signUpData = {
        username,
      firstName,
      lastName,
      email,
      password,
    };

    return dispatch(sessionActions.signUp(signUpData)).catch(
        async (res) => {
      const data = await res.json();
      if (data?.errors) setErr(data.errors);
    });
  }
//Todo: add error prompts to the form for all fields
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {/* {errors.username && <p>{errors.username}</p>} */}
        <label htmlFor="firstName">firstName:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* {errors.firstName && <p>{errors.firstName}</p>} */}
        <label htmlFor="lastName">lastName:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* {errors.lastName && <p>{errors.lastName}</p>} */}
        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {err && <p>{err.password}</p>}
        <label htmlFor="confirmPassword">confirmPassword:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button type="submit" disabled={Object.keys(err).length} >Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormPage;
