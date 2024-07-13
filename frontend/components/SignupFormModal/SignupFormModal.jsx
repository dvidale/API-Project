import { useState } from "react";
import { useDispatch} from "react-redux";
import { useModal } from '../../src/context/Modal'
import * as sessionActions from '../../src/store/session';
import './SignupForm.css';


const SignupFormModal = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
const { closeModal } = useModal();

  const dispatch = useDispatch();
  


  

  //Todo: Make sure the password validation behavior satisfies the scorecard


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
    });
  }
//Todo: add error prompts to the form for all fields

return setErrors({
  confirmPassword: "Confirm Password field must be the same as the Password field"
});

}
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
         {errors && <p>{errors.password}</p>}
        <label htmlFor="confirmPassword">confirmPassword:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button type="submit" disabled={Object.keys(errors).length} >Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormModal;
