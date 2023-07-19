import React from 'react';
import './AccountInfo.css'
import { useNavigate } from 'react-router-dom';

function AccountInfo() {
  const navigate = useNavigate();

  return (
    <div className='centered' id='account-container'>
      <div className='account-field' id='user-welcome'>
        <h3>Welcome!</h3>
      </div>
      <div className='account-field' id='account-create'>
        <button onClick={() => {
          navigate('/create-account');
        }}>Create an Account</button>
      </div>
      <div className='account-field' id='account-login'>
        Login
      </div>
    </div>
  )
}

export default AccountInfo;