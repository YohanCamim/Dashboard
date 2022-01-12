import { GoogleLogout } from 'react-google-login';
import React from 'react';

function Logout() {
  return (
  <>
    <GoogleLogout
    clientId= {process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess= {localStorage.clear()}
    isSignedIn={false}
    >
  </GoogleLogout>
  </>
  )
}

export default Logout
