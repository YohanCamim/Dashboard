import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { addUserChange, clearUserChange } from '../features/userSlice';
 
function useGoogleAuthentication() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleSuccess = (response) => {
  
    if ('accessToken' in response) {
  
      const accessToken = response.accessToken;
      localStorage.setItem("isAuth", true)
      localStorage.setItem("GaccessToken", accessToken)
  
      fetch(`${process.env.REACT_APP_API_URL}/google-authentication`, {
      method: 'POST',
      body: JSON.stringify({
        token: accessToken}),headers: {'Content-Type': 'application/json'},
      }).then(response => response.json()).then(data => {
      dispatch(clearUserChange()) 
      localStorage.setItem("ownTokken", data.accessToken)
      const token= localStorage.getItem('ownTokken')
      fetch(`http://localhost:3000/widgets/me`, {method: 'GET',headers: {'authorization': `Bearer ${token}`},})
        .then(response => response.json()).
          then(data => {
            console.log(data[0].widgets)
            dispatch(addUserChange(data[0].widgets))    
          }); 
      });

    }
  }
  return {
    handleSuccess,
  }
}
export default useGoogleAuthentication;
