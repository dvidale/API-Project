import { RiAccountCircleFill } from "react-icons/ri";
import { IoMenuSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../src/store/session'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useNavigate } from "react-router-dom";
import './Navigation.css'

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

      useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener('click', closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);
      const navigate = useNavigate()


      const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate('/')
      };

  
      const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    
    return (
        <>
        
       <button id="user-menu-button" onClick={toggleMenu}> 
       <IoMenuSharp />
        <RiAccountCircleFill /> 
        </button> 
       <ul className={ulClassName} ref={ulRef}>
        {user ? (
<>

<span>Hello, {user.firstName}</span>
<li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
     <br/>
        <li><Link to='/spots/current'>Manage Spots</Link></li>
        <br/>
        <li>
          <div className="dropdown-button-container"> 
          <button  onClick={logout}>Log Out</button>
          </div>
        </li>
 
</>
        ):(
<>

<li>
  <div className="dropdown-button-container" >
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
            </li>
<li><div className="dropdown-button-container" >
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
               </div>
            </li>
           
            
         
</>
        )}     
      </ul>
        </>
    )
}

export default ProfileButton