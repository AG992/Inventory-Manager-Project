import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AccountCreate.css'
import { AppContext } from "../App";

function AccountCreate() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function createAccountHandler() {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
    };

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(newUser)
    }

    fetch(`http://localhost:8080/create-account/`, postOptions)
      .then(res => res.json())
      .then(data => {
        if(data.message === 'User already exists') {
          return (
            <div id='account-failure'>
              {toast('Username already exists!')}
            </div>
          );
        } else {
          setTimeout(() => navigate('/'), 2000)

          return (
            <div id='account-success'>
              {toast('Account created successfully!')}
            </div>
          )
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='account-creation-container'>
      <ToastContainer />
      <div className='centered'>Thank you for choosing to create an account with us!</div>
      <Link to='/'><h4 className='centered'>or head back home... :(</h4></Link>
      <div>
        <h4 className='centered'>Please enter the following account information</h4>
      </div>
      <div className='account-creation-field centered'>
        <label>First Name: </label>
        <input type='text' onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div className='account-creation-field centered'>
        <label>Last Name: </label>
        <input type='text' onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <div className='account-creation-field centered'>
        <label>Username: </label>
        <input type='text' onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className='account-creation-field centered'>
        <label>Password: </label>
        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button onClick={createAccountHandler}>Create Account!</button>        
    </div>
  )
}

export default AccountCreate;