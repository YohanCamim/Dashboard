import React from 'react'
import Signup from '../components/Signup'
import { useSelector } from 'react-redux';
//import { useAddContactMutation } from '../services/apiAuth'

function Register() {
  const authy = useSelector((state) => state.authy)
      return (
        <>
       <Signup /> 
        <p>{JSON.stringify(authy.authy)}</p>
        </>
    )
}
export default Register


   

