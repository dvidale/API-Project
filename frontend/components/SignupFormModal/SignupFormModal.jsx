import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useModal } from '../../src/context/Modal'
import * as sessionActions from '../../src/store/session';
import './SignupForm.css';


const SignupFormModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
 
const { closeModal } = useModal();

  const dispatch = useDispatch();
  

useEffect(()=>{
const err = {}

 if(!firstName){
err.firstName = "Cannot be empty"
 } else if(firstName.length > 4 && firstName.slice(0,4).includes(" ")) err.firstName = "Cannot start with empty spaces"


 if(!lastName){
err.lastName = "Cannot be empty"
 } else if(lastName.length > 4 && lastName.slice(0,4).includes(" ")) err.lastName = "Cannot start with empty spaces"
 if(!email) err.email = "Cannot be empty"

 if(!username){
err.username = "Cannot be empty"

 } else if(username.length > 4 && username.slice(0,4).includes(" ")) err.username = "Cannot start with empty spaces"

 if(!password) err.password = "Cannot be empty"
 if(!confirmPassword) err.confirmPassword = "Cannot be empty"
 
 if(username.length < 4) err.username = "Username must be longer than 4 characters"
 if(password.length < 6) err.password = "Password must be 6 characters or more"


 setErrors(err)


},[firstName, lastName, email, username, password, confirmPassword])


  function submitHandler(e) {
 
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
    
    const signUpData = {
        username,
      firstName,
      lastName,
      email,
      password,
    };

    return dispatch(sessionActions.signUp(signUpData)).then(closeModal).catch(
        async (res) => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
      alert(`
        ${data.errors.firstName ? data.errors.firstName : "" }
         ${data.errors.lastName ? data.errors.lastName : "" }
        ${data.errors.email ? data.errors.email : "" }
        ${data.errors.username ? data.errors.username : "" }
        ${data.errors.password ? data.errors.password : "" }`)
    });
  }


return setErrors({
  confirmPassword: "Confirm Password field must be the same as the Password field"
});

}
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstName"> First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.username && <p>{errors.username}</p>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {errors && <p>{errors.password}</p>}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" disabled={Object.keys(errors).length} >Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormModal;
