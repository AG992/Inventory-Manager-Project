import React from 'react';
import './Account.css'

function Account() {

  return (
    <div className='centered' id='account-container'>
      <div className='account-field' id='user-welcome'>
        <h3>Welcome!</h3>
      </div>
      <div className='account-field' id='account-create'>
        Create an Account
      </div>
      <div className='account-field' id='account-login'>
        Login
      </div>
    </div>
  )
}

export default Account;