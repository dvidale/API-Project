import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";

import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
      <ul>
<li> 
      <NavLink to="/"> {<img alt="Home" src="./heirbnb_site_logo_v1_full_size.png" />} </NavLink>
      </li>

{isLoaded && (
<li>
<ProfileButton user={sessionUser} /> 
   </li>
  )}
</ul>
);
}
export default Navigation;
