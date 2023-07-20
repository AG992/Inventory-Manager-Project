import React, { useContext, useState } from 'react';
import './AccountInfo.css'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from '../App';

const getOptions = {
  method: 'GET',
  credentials: 'include',
}

function AccountInfo() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const {user, setUser} = useContext(AppContext);

  async function loginHandler() {
    
    await fetch(`http://localhost:8080/login/user/${username}-${password}`, getOptions)
      .then(res => res.json())
      .then((data) => {
        // console.log(data.message);
        if(data.message === 'Failed Login') {
          return (
              toast('Login failed! Username or password is wrong!')
          );
        } else {
          toast(`Login success! Welcome ${username}!`);
          setUser({loggedIn: true});
        }
      });
  }

  async function logoutHandler() {
    let req = await fetch('http://localhost:8080/clear-cookies', getOptions)
    let res = await req.json();
    // console.log(res);
    setUser({loggedIn: false});
  }

  const PopupButton = <Popup
    trigger={() => (
      <button className='account-field' id='account-login'>Login</button>
    )}
    position='bottom center'
    children={() => {
      return (
        <div className='popup-container centered'>
          <label>Username: </label>
          <input type='text' onChange={(e) => setUsername(e.target.value)} />
          <label>Password: </label>
          <input type='password' onChange={(e) => setPassword(e.target.value)} />
          <button onClick={loginHandler}>Login</button>
        </div>
      )
    }}
  />

  return (
    <div className='centered' id='account-container'>
      <ToastContainer/>
      <div className='account-field' id='user-welcome'>
        {user.loggedIn ? (<h3>{`Welcome ${user.username}!`}</h3>)
          : (<h3>Welcome !</h3>
        )}
      </div>
      <div className='account-field' id='account-create'>
        <button onClick={() => {
          navigate('/create-account');
        }}>Create an Account</button>
      </div>
      {user.loggedIn ? (<button onClick={() => navigate('/your-posts')}>Your Posts</button>) : (<></>)}
      {user.loggedIn ? <button onClick={logoutHandler}>Logout</button> : PopupButton}
    </div>
  )
}

export default AccountInfo;