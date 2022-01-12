import React from 'react'
import GoogleButton from '../components/GoogleButton';
import Signin from '../components/Signin'
import { useSelector } from 'react-redux';


const responseGoogle = (response) => {
    console.log(response);
}
    
function Login() {
    const authy = useSelector((state) => state.authy)
    const user = useSelector((state) => state.user)
    return (
        <div>
            <Signin />
            <div className="google">
            <GoogleButton />
            </div>
        </div>
    )
}
export default Login





   