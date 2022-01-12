import React from 'react'
// import { useState } from 'react';
import {useLoveQuery} from '../services/apiLove'

function Resultlove(props) {

    const param1 = props.param1
    const param2 = props.param2
  
    const {data, error, isLoading, isFetching, isSuccess} = useLoveQuery({param1, param2},{pollingInterval: 60000,});


    return (
        
        <div>
            {isSuccess && ( <>
            <span>{data.fname} and {data.sname} scored {data.percentage} %</span>
            <br></br>
            <i>{data.result}</i></>)}
        </div>
    )
}

export default Resultlove
