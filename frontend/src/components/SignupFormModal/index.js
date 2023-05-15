import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [particularErrors, setParticularErrors] = useState({})
  const { closeModal } = useModal();

  useEffect(() => {
    const onDisplayErrors = {}
    if (!(email && username && firstName && lastName && password && confirmPassword)) onDisplayErrors.message = "Please fill in all fields"
    if (username.length >= 1 && username.length < 4) onDisplayErrors.username = "Please provide a username with at least 4 characters."
    if (password.length >= 1 && password.length < 6) onDisplayErrors.password = "Password must be 6 characters or more."
    setParticularErrors(onDisplayErrors)
  }, [email, username, firstName, lastName, password, confirmPassword])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }

        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {particularErrors.username && <p className='sign-up-errors'>{particularErrors.username}</p>}
        {particularErrors.password && <p className='sign-up-errors'>{particularErrors.password}</p>}
        {errors.email && <p className='sign-up-errors'>{errors.email}</p>}
        {errors.username && <p className='sign-up-errors'>{errors.username}</p>}
        {errors.firstName && <p className='sign-up-errors'>{errors.firstName}</p>}
        {errors.lastName && <p className='sign-up-errors'>{errors.lastName}</p>}
        {errors.confirmPassword && <p className='sign-up-errors'>{errors.confirmPassword}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button id='btn-for-signup' type="submit" disabled={Object.values(particularErrors).length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
