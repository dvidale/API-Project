import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useModal } from '../../src/context/Modal'
import * as sessionActions from '../../src/store/session';
import './SignupForm.css';
import '../../src/index.css'


const SignupFormModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
 const [isDisabled, setIsDisabled] = useState(false);


const { closeModal } = useModal();

  const dispatch = useDispatch();
  

useEffect(()=>{
  setIsDisabled(false)


 if(!firstName) setIsDisabled(true)
  
//   {
// err.firstName = "Cannot be empty"
//  } 
//  else if(firstName.length > 4 && firstName.slice(0,4).includes(" ")) err.firstName = "Cannot start with empty spaces"


 if(!lastName) setIsDisabled(true)
  
//   {
// err.lastName = "Cannot be empty"
//  }
//  else if(lastName.length > 4 && lastName.slice(0,4).includes(" ")) err.lastName = "Cannot start with empty spaces"


 if(!email) setIsDisabled(true)
  
  // err.email = "Cannot be empty"

 if(!username) setIsDisabled(true)
  
//   {
// err.username = "Cannot be empty"

//  }
  // else if(username.length > 4 && username.slice(0,4).includes(" ")) err.username = "Cannot start with empty spaces"

 if(!password) setIsDisabled(true)
  // err.password = "Cannot be empty"
 
 if(!confirmPassword) setIsDisabled(true)
  // err.confirmPassword = "Cannot be empty"
 



},[firstName, lastName, email, username, password, confirmPassword])


  function submitHandler(e) {
 
    e.preventDefault();

    const err = {}

    if(username.length < 4) {
      err.username = "Username must be longer than 4 characters"
    setIsDisabled(true)
    }
    if(password.length < 6){
err.password = "Password must be 6 characters or more"
setIsDisabled(true)
    } 
      
    setErrors(err)


    if (password !== confirmPassword) {
      err.confirmPassword = "Confirm Password field must be the same as the Password field"
     setIsDisabled(true)
    
    setErrors(err)}
     else{
    setIsDisabled(false)
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
      // alert(`
      //   ${data.errors.firstName ? data.errors.firstName : "" }
      //    ${data.errors.lastName ? data.errors.lastName : "" }
      //   ${data.errors.email ? data.errors.email : "" }
      //   ${data.errors.username ? data.errors.username : "" }
      //   ${data.errors.password ? data.errors.password : "" }`)

      console.log(">>>>setErrors with server res", errors);
    });
  }




}
  return (
    <>
      <div id="sign-up-form-modal">
      <form onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      {errors.firstName && <p className="errors">{errors.firstName}</p>}
      {errors.lastName && <p className="errors">{errors.lastName}</p>}
      {errors.email && <p className="errors">{errors.email}</p>}
      {errors.username && <p className="errors">{errors.username}</p>}
      {errors.password && <p className="errors">{errors.password}</p>}
      {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
         <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

    
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
   
    
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
     

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
    
    
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
   
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
   <div className="center-button">
        <button type="submit" disabled={isDisabled} >Sign Up</button>
        </div>
      </form>
      </div>
    </>
  );
};

export default SignupFormModal;
