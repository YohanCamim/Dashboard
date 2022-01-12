import React from 'react'
import { useAddContactMutation } from '../services/apiAuth'

function Test() {
    
    const [addContact] = useAddContactMutation();
    const contact = {
            "email": "niklas.hook@epitech.eu",
            "password": "epitech21",
            "password_confirmation": "epitech21"
    }
    const addHandler = async() =>{
        await addContact(contact)
      }
    return (

        <div>
            <button onClick={addHandler}>register</button>

        </div>
    )
}

export default Test
