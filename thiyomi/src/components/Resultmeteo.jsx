import React from 'react'
import { useMeteoQuery } from '../services/apiMeteo'; //###############

function Resultmeteo(props) {
    const param1 = props.param1
    const {data, error, isLoading, isFetching, isSuccess} = useMeteoQuery(param1); //,{pollingInterval: 60000,}
  
    return (
    <>        
    <div>
        {isLoading && <h2>... is currently Loading</h2>}
        {isFetching && <h2>... is currently Fetching</h2>}
        {error && <h2>... there is currently une couille dans le paté</h2>}
        {isSuccess && (
            <>
            <p>PAYS: {data.sys.country} - VILLE: {data.name}</p>
            <img src={"http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png"} alt="image refletant le temps actuel"/>
            <p>SYNTHESE: {data.weather[0].main}</p>
            <p>ETAT GENERAL: {data.weather[0].description}</p>
            <p>TEMPERATURE: {data.main.temp} C° - VITESSE DU VENT: {data.wind.speed}</p>
            </>
        )}
                
        {/* {JSON.stringify(data.weather[0])} */}
     {/* {data[param1] && data[param2]? data[param1][param2]: 'No conversion available my dear friend'} */}
    </div>
    </>

    )
}

export default Resultmeteo
