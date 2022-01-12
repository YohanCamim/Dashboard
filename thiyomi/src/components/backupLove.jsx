import React from 'react'
import { useState } from 'react'
import { useLoveQuery } from '../services/apiLove'
import { useSelector, useDispatch } from 'react-redux'
import { addLoveChange, getLoveChange } from '../features/loveSlice'
import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddLovePreferenceMutation, useAddPreferenceMutation } from '../services/apiAuth'
import Resultlove from './Resultlove'

const LoveSelectBox = (props) => {

    const love = useSelector((state) => state.love)
    const user = useSelector((state) => state.user)
    const token= localStorage.getItem('ownTokken')


    // hooks
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(props.params[0])
    const [secondName, setSecondName] = useState(props.params[1])

    //queries
    const [AddLovePreference] = useAddPreferenceMutation();
    const preferenceSynthese = {
        params: [firstName, secondName],
        service: props.services,
        id: props._id
    }


    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleSecondName = (e) => {
        setSecondName(e.target.value)
    }
    // const [AddLovePreference] = useAddLovePreferenceMutation();
    // const lovePreference = JSON.parse('{"param1": "'+ firstName + '", "param2": "'+ secondName +'"}')
    const handleAddLovePreference = async () => {
        let preferences = [firstName, secondName]
        dispatch(addLoveChange(preferences))
        const retour = await AddLovePreference(preferenceSynthese)
        fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: {'authorization': `Bearer ${token}`},})
              .then(response => response.json())
                .then(data => {
                  console.log(data[0])
                    dispatch(addUserChange(data[0].widgets))});
        
    }
    return (
        <div className="widgets">
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
                <div className="result">
            <Resultlove param1={firstName} param2={secondName} />
            </div>
            <br />
            <button id="SaveSettings" onClick={handleAddLovePreference} >SavePreferences</button>
            </div>
            {/* <p> mes préférences actuelles: {JSON.stringify(bitcoin.bitcoin)}</p> */}
        </div>
    )
}

export default LoveSelectBox