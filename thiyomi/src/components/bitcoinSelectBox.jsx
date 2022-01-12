//import store from '../app/store'
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Resultbitcoin from './Resultbitcoin';
import { addBitcoinChange, getBitcoinChange } from '../features/bitcoinSlice';
import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddCryptoPreferenceMutation, useAddPreferenceMutation, useDeletePreferenceMutation} from '../services/apiAuth'
import { useSimpleQuery } from '../services/api';



const BitcoinSelectBox = (props)=> {

    //store & global variables
    const currencies = ['bitcoin', 'bitcoin-gold', 'ethereum', 'ethereum-classic', 'binance-peg-cardano', 'monero', 'binance-peg-xrp', 'litecoin', 'nem', 'neo', 'tron', 'qtum', 'iota', 'dash', 'stellar', 'stellarpayglobal']
    const bitcoin = useSelector((state) => state.bitcoin)
    const user = useSelector((state) => state.user)
    const token= localStorage.getItem('ownTokken')

    //hooks
    const dispatch = useDispatch()
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState(props.params[0])
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState(props.params[1])    
    let preferences =[chosenPrimaryCurrency, chosenSecondaryCurrency]    
    
    //queries
    const {data, error, isLoading, isFetching, isSuccess} = useSimpleQuery();
    const [AddCryptoPreference] = useAddPreferenceMutation();
    const [DeleteCryptoPreference] = useDeletePreferenceMutation();
    
    
    const deletePreference = {
        id: props._id
    }
  
    const preferenceSynthese = {
        params: [chosenPrimaryCurrency,chosenSecondaryCurrency],
        service: props.services,
        id: props._id
    }

    // const preferenceSynthese = JSON.parse('{"params": "['+ [chosenPrimaryCurrency, chosenSecondaryCurrency]+ ']", "service": "' + props.services + '", "_id":"' + props._id.toString() + '"}')
    //console.log(preferenceSynthese)

    const handleAddBitcoinPreference = async () => {
        let preferences =[chosenPrimaryCurrency, chosenSecondaryCurrency]
        dispatch(addBitcoinChange(preferences))
        const retour = await AddCryptoPreference(preferenceSynthese)
        if (retour.error) { return alert(retour.error.data.message)} else {
            //console.log(retour.data)
            dispatch(clearUserChange()) 
            fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: {'authorization': `Bearer ${token}`},})
              .then(response => response.json())
                .then(data => {
              //    console.log(data[0])
                    dispatch(addUserChange(data[0].widgets))});
        }
    }

    const handleDeletePreference = async () =>{
        const retour = await DeleteCryptoPreference(deletePreference)
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
            <h2>DU COTE DES CRYPTO</h2>
            {/* {props._id} */}
            <div className="input-box">
                <table>
                    <tbody>
                    <tr>
                        <td>Crypto</td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>       
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            {isLoading && <h2>... is currently Loading</h2>}
                            {isFetching && <h2>... is currently Fetching</h2>}
                            {error && <h2>... there is currently une couille dans le paté</h2>}
                            {isSuccess && (
                                <select
                                value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}                            
                                >
                                {data?.map((coin, _index) => (<option key={_index}>{coin}</option>))}
                                </select>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="result">
            <Resultbitcoin param1={chosenPrimaryCurrency} param2={chosenSecondaryCurrency}/>
            </div>
            <br/>
            <br/>
            {/* <p>{JSON.stringify(preferenceSynthese)}</p> */}
            <button id="SaveSettings" onClick={handleAddBitcoinPreference} >Save Preferences</button>
            <button onClick={handleDeletePreference}>RETIRER DE MES FAVORIS</button>
            {/* <p> mes préférences actuelles: {JSON.stringify(bitcoin.bitcoin)}</p> */}
    </div>
)
}

export default BitcoinSelectBox;







// const [exchangedData, setExchangedData] = useState({
//     primaryCurrency: 'bitcoin',
//     secondaryCurrency: 'eur',
//     exchangeRate: 0
// })