import React from 'react';
import { useState } from 'react';
import Resultmeteo from './Resultmeteo';
import store from '../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { addMeteoChange, getMeteoChange } from '../features/meteoSlice';

import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddMeteoPreferenceMutation,useDeletePreferenceMutation, useAddPreferenceMutation } from '../services/apiAuth'

function MeteoSelectBox(props) {
    // store & global variables
    const cities = ['lyon', 'paris', 'bordeaux', 'annecy', 'lille', 'marseille', 'toulouse', 'montpellier', 'rennes', 'orleans']
    const user = useSelector((state) => state.user)
    const meteo = useSelector((state) => state.meteo)
    const token = localStorage.getItem('ownTokken')

    //hooks
    const dispatch = useDispatch()
    const [chosenPrimaryCity, setChosenPrimaryCity] = useState(props.params[0])
    
    //queries  // const [AddMeteoPreference] = useAddMeteoPreferenceMutation();
    const [AddMeteoPreference] = useAddPreferenceMutation();
    const [DeleteMeteoPreference] = useDeletePreferenceMutation();
    
    const deletePreference = {
        id: props._id
    }
    const preferenceSynthese = {
        params: [chosenPrimaryCity],
        service: props.services,
        id: props._id
    }

    // const meteoPreference = JSON.parse('{"city": "' + chosenPrimaryCity + '"}')

    const handleAddMeteoPreference = async () => {
        dispatch(addMeteoChange(chosenPrimaryCity))
        // const retour = await AddMeteoPreference(meteoPreference)
        const retour = await AddMeteoPreference(preferenceSynthese)
        if (retour.error) { return alert(retour.error.data.message) } else {
           // console.log(retour.data)
            dispatch(clearUserChange())
            fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: { 'authorization': `Bearer ${token}` }, })
                .then(response => response.json())
                .then(data => {
                    //console.log(data[0])
                    dispatch(addUserChange(data[0].widgets))
                });
        }

    }
    const handleDeletePreference = async () =>{
        const retour = await DeleteMeteoPreference(deletePreference)
        if (retour.error) { return alert(retour.error.data.message)} else {
            //console.log(retour.data)
            dispatch(clearUserChange()) 
            fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: {'authorization': `Bearer ${token}`},})
              .then(response => response.json())
                .then(data => {
                    dispatch(addUserChange(data[0].widgets))});
        }
        
    }
    return (
        <div className="widgets">
            <h2>DU COTE DE LA METEO</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>DESTINATION:</td>
                            <td>
                                <select
                                    value={chosenPrimaryCity}
                                    name="city-option-1"
                                    className="city-options"
                                    onChange={(e) => setChosenPrimaryCity(e.target.value)}
                                >
                                    {cities.map((city, _index) => (<option key={_index}>{city}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="result">
                    <Resultmeteo param1={chosenPrimaryCity} />
                </div>
                <button id="SaveSettings" onClick={handleAddMeteoPreference} >SavePreferences</button>
                <button onClick={handleDeletePreference}>RETIRER DE MES FAVORIS</button>
                {/* <p>{JSON.stringify(meteoPreference)}</p> */}
            
            {/* <p> mes préférences actuelles: {JSON.stringify(bitcoin.bitcoin)}</p> */}
        </div>
    )
}

export default MeteoSelectBox
