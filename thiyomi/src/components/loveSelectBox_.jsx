import React from 'react'
import { useState } from 'react'
import { useLoveQuery } from '../services/apiLove'
import { useSelector, useDispatch } from 'react-redux'
import { addLoveChange, getLoveChange } from '../features/loveSlice'
import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddLovePreferenceMutation, useAddPreferenceMutation, useDeletePreferenceMutation } from '../services/apiAuth'
import Resultlove from './Resultlove'

const LoveSelectBox_ = () => {

    //store & global variables
    const love = useSelector((state) => state.love)
    const [firstName, setFirstName] = useState('John')
    const [secondName, setSecondName] = useState('Alice')
    const token= localStorage.getItem('ownTokken')

    //hooks
    const dispatch = useDispatch()

    //queries
    const [AddLovePreference] = useAddPreferenceMutation();
    // const preferenceSynthese = {params: [firstName,secondName], service: props.services, id: props._id}


    const handleFirstName = (e) => {setFirstName(e.target.value)}
    const handleSecondName = (e) => {setSecondName(e.target.value)}
    
    const lovePreference = JSON.parse('{"param1": "'+ firstName + '", "param2": "'+ secondName +'"}')
    
    
    const handleAddLovePreference = async () => {
        let preferences = [firstName, secondName]
        dispatch(addLoveChange(preferences))
        const retour = await AddLovePreference(lovePreference)
        fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: {'authorization': `Bearer ${token}`},})
              .then(response => response.json())
                .then(data => {
                  console.log(data[0])
                    dispatch(addUserChange(data[0].widgets))});        
    }


    return (
        <div className="loveSelectedBoxes">
            <h2>DU COTE DES AMOURS</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>First name:</td>
                            <td>
                                <input onChange={handleFirstName}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Name:</td>
                            <td>
                                <input onChange={handleSecondName}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Resultlove param1={firstName} param2={secondName} />
            <br />
            <br />
            {/* <button id="SaveSettings" onClick={handleAddLovePreference} >SavePreferences</button> */}
                       {/* <p> mes préférences actuelles: {JSON.stringify(bitcoin.bitcoin)}</p> */}
        </div>
    )
}

export default LoveSelectBox_