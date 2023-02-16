import React from 'react';
import AuthenticationButton from '../buttons/Authentication';

export default function Signin() {
  return (
    <div className="sign_in-container">
      <div>
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
      </div>
      <div className="logo" />
      <AuthenticationButton />
    </div>
  );
}
