import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from 'react-router-dom'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [particularErrors, setParticularErrors] = useState({})
  const [hasTypedUsername, setHasTypedUsername] = useState(false)
  const [hasTypedPassword, setHasTypedPassword] = useState(false)


  useEffect(() => {
    const onDisplayErrors = {}
 
    if (credential.length < 4) onDisplayErrors.credential = ` Please provide a username with at least 4 characters. `
    if (password.length < 6) onDisplayErrors.password = ` Password must be 6 characters or more. `
    setParticularErrors(onDisplayErrors)

    if (credential.length >= 1 && credential.length < 4) setHasTypedUsername(true)
    if (password.length >= 1  && password.length < 6) setHasTypedPassword(true)

  }, [credential, password])







  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUser = () => {
    closeModal();
    return dispatch(sessionActions.login(
      { credential: 'Demo-lition', 
        password: 'password' 
      }))
      
  }

  return (
    <>
      <h1>Log In</h1>
      {hasTypedUsername === true && <p className='error-shown-as-typing'>{particularErrors.credential}</p>}
      {hasTypedPassword === true && <p className='error-shown-as-typing'>{particularErrors.password}</p>}
      {errors.credential && (<p className='red-errors'>{errors.credential}</p>)}
      <form id='login-modal-form' onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input id='username-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input id='password-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={Object.values(particularErrors).length > 0}>Log In</button>
        <Link id='demo-user-link' to='/' onClick={handleDemoUser}>Demo User</Link>
      </form>
    </>
  );
}

export default LoginFormModal;
