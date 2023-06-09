import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navigation-ul'>
      <li className='home'>
        <NavLink id='home-link' exact to="/">{
          <>
         <img id='logo' src="https://archives.bulbagarden.net/media/upload/b/b4/0025Pikachu-Cosplay.png" alt='pikachu'/>
          <p>Happybnb</p>
          </>}
          </NavLink>
      </li>
      <div className='group-right'>
      {sessionUser && (<li><NavLink id= 'create-spot-navlink' exact to='/spots/new'>Create a New Spot</NavLink></li>)}
      {isLoaded && (
        <li className='profile-btn'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
