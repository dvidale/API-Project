import { RiAccountCircleFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../src/store/session'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from "react-router-dom";

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const [loggedIn, setLoggedIn] = useState(true)

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

      const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        setLoggedIn(false)
      };


      const navigate = useNavigate()

      useEffect(()=>{

        if(!loggedIn) navigate('/')


      },[loggedIn, navigate])
  
      const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    
    return (
        <>
        
       <button onClick={toggleMenu}> 
        <RiAccountCircleFill /> 
        </button> 
       <ul className={ulClassName} ref={ulRef}>
        {user ? (
<>
<p>Hello, {user.firstName}</p>
<li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
</>
        ):(
<>
<li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
</>
        )}     
      </ul>
        </>
    )
}

export default ProfileButton