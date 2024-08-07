import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";


import "./Navigation.css";


const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);



  return (
   
      <nav id='nav-container'>
<div> 
      <NavLink to="/"> {<img alt="Home" src="/heirbnb_site_logo_v1_full_size.png" />} </NavLink>
      </div>


{isLoaded && (
      <>
       
<div id="create-and-dropdown">
{sessionUser &&  <Link to='/spots/new' replace={true}id="create-spot-button" >Create A New Spot</Link>}
<ProfileButton id='profile-button' user={sessionUser} /> 
   </div>
   </> )}
</nav>

);
}
export default Navigation;
