import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import { useSelector, } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
  ) : (
    <>
      <li>
      <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </>
  );

    return (
        <ul>
            <li>
            <NavLink to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );

}


export default Navigation;