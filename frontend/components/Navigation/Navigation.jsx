import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import "./Navigation.css";


const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
// const navigate = useNavigate();

  return (
   
      <nav id='nav-container'>
<div> 
      <NavLink to="/"> {<img alt="Home" src="./heirbnb_site_logo_v1_full_size.png" />} </NavLink>
      <NavLink to={'/test'}>Test</NavLink>
      </div>


{isLoaded && (
      <>
       
<div>
{sessionUser &&  <Link to='/spots/new' id="create-spot-button" >Create A New Spot</Link>}
<ProfileButton user={sessionUser} /> 
   </div>
   </> )}
</nav>

);
}
export default Navigation;
