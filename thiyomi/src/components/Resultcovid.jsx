import React from 'react'
import { useCovidQuery } from '../services/apiCovid'; //###############

function Resultcovid(props) {
    const param1 = props.param1
    const {data, error, isLoading, isFetching, isSuccess} = useCovidQuery(param1,{pollingInterval: 60000,}); //
  
    return (
    <>        
    <div>
        {isLoading && <h2>... is currently Loading</h2>}
        {isFetching && <h2>... is currently Fetching</h2>}
        {error && <h2>... there is currently une couille dans le paté</h2>}
        {isSuccess && (
            <>
            <p>COUNTRY: {data.country} </p>
            <img src={data.countryInfo.flag} alt="image refletant le temps actuel"/>
            <p>SYNTHESE: {data.population} inhabitants and {data.casesPerOneMillion} cases per Million/hab</p>
            <p>TESTS overview: {data.testsPerOneMillion} tests per Million/hab</p>
            <p>one case out of : {data.oneDeathPerPeople} is affected -</p>
            <p>total number of cases : {data.cases}  --- today cases/deaths: {data.todayCases}/{data.todayDeaths} -</p>
            </>
        )}
                
        {/* {JSON.stringify(data.weather[0])} */}
     {/* {data[param1] && data[param2]? data[param1][param2]: 'No conversion available my dear friend'} */}
    </div>
    </>

    )
}

export default Resultcovid