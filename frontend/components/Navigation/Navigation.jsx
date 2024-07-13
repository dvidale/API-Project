import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import { useSelector, } from 'react-redux';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";


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
        <NavLink to="/signup">Sign Up</NavLink>
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