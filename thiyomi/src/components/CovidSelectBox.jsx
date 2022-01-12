import React from 'react';
import { useState } from 'react';
import Resultcovid from './Resultcovid';
import store from '../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { addCovidChange, getCovidChange } from '../features/covidSlice';

import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddCovidPreferenceMutation,useDeletePreferenceMutation, useAddPreferenceMutation } from '../services/apiAuth'

function CovidSelectBox(props) {
    // store & global variables
    const countries = ['france','america', 'germany', 'spain', 'portugal', 'italy','belgium', 'netherlands', 'switzerland','england', 'ireland', 'scotland', 'greece', 'Czechia', 'norway', 'finland', 'sweden', 'poland', 'russia', 'romania', 'croatia', 'hungary']
    const user = useSelector((state) => state.user)
    const covid = useSelector((state) => state.covid)
    const token = localStorage.getItem('ownTokken')

    //hooks
    const dispatch = useDispatch()
    const [chosenPrimaryCountry, setChosenPrimaryCountry] = useState(props.params[0])
    
    //queries  // const [AddCovidPreference] = useAddCovidPreferenceMutation();
    const [AddCovidPreference] = useAddPreferenceMutation();
    const [DeleteCovidPreference] = useDeletePreferenceMutation();
    
    const deletePreference = {
        id: props._id
    }
    const preferenceSynthese = {
        params: [chosenPrimaryCountry],
        service: props.services,
        id: props._id
    }

    // const covidPreference = JSON.parse('{"country": "' + chosenPrimaryCountry + '"}')

    const handleAddCovidPreference = async () => {
        dispatch(addCovidChange(chosenPrimaryCountry))
        // const retour = await AddCovidPreference(covidPreference)
        const retour = await AddCovidPreference(preferenceSynthese)
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
        const retour = await DeleteCovidPreference(deletePreference)
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
            <h2>DU COTE DE LA SANTE</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>DESTINATION:</td>
                            <td>
                                <select
                                    value={chosenPrimaryCountry}
                                    name="country-option-1"
                                    className="country-options"
                                    onChange={(e) => setChosenPrimaryCountry(e.target.value)}
                                >
                                    {countries.map((country, _index) => (<option key={_index}>{country}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="result">
                    <Resultcovid param1={chosenPrimaryCountry} />
                </div>
                <button id="SaveSettings" onClick={handleAddCovidPreference} >SavePreferences</button>
                <button onClick={handleDeletePreference}>RETIRER DE MES FAVORIS</button>
                {/* <p>{JSON.stringify(covidPreference)}</p> */}
            
            {/* <p> mes préférences actuelles: {JSON.stringify(covid.covid)}</p> */}
        </div>
    )
}

export default CovidSelectBox
