import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

function AuthenticationButton() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Button
        type="button"
        size="lg"
        className="sign-in-btn"
        onClick={signIn}
      >Sign In
      </Button>
    );
  }
  return (
    <button
      type="button"
      className="border-none background-none fnt-danger"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
}
export default AuthenticationButton;
