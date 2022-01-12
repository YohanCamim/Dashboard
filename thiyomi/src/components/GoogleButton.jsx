import React from 'react';
import GoogleLogin from 'react-google-login';
import useGoogleAuthentication from "./useGoogleAuthentification"


function GoogleButton() {
    const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
    const { handleSuccess } = useGoogleAuthentication();
   
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in"
        onSuccess={handleSuccess}
        isSignedIn={true}
        scope="profile email https://www.googleapis.com/auth/youtube"
      />
    );
  }
   
  export default GoogleButton;
  