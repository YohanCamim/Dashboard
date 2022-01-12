import React from 'react'
// import { useState } from 'react';
import { useCombinedQuery } from '../services/api'; //###############

function Resultbitcoin(props) {

    const param1 = props.param1
    const param2 = props.param2
  
    const {data, error, isLoading, isFetching, isSuccess} = useCombinedQuery({param1, param2},{pollingInterval: 60000,});


    return (
        <div>
            {/* {JSON.stringify(data, undefined, 2)} */}
            {JSON.stringify(data)}
            <br/>
         {/* {data[param1] && data[param2]? data[param1][param2]: 'No conversion available my dear friend'} */}
        </div>
    )
}

export default Resultbitcoin
