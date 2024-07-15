import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <>
      <OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />
      <OpenModalButton
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
      />
    </>
  );

  return (
    <header>
    <nav>
      <div id="nav-left">
      <NavLink to="/">
        {<img alt="Home" src="./heirbnb_site_logo_v1_full_size.png" />}
      </NavLink>
      </div>
     
<div id="nav-right">
<NavLink to='/test'>Test</NavLink>
{isLoaded && sessionLinks}

</div>
      
    </nav>
    </header>
  );
};

export default Navigation;
