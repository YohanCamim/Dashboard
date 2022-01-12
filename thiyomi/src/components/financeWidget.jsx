// not used anymore
// but still efficient if needed, if added as component to app.js



import React from 'react';
import { useContactsQuery } from '../services/api';


function FinanceWidget (){
    const {data, error, isLoading, isFetching, isSuccess} = useContactsQuery();
    return (
      <div className="financeWidget">
            <h1> First Widget with Bitcoins</h1>
            {isLoading && <h2>... is currently Loading</h2>}
            {isFetching && <h2>... is currently Fetching</h2>}
            {error && <h2>... there is currently une couille dans le paté</h2>}
            {isSuccess && (
              <div>
                  {data?.map(coin => {
                    return <div className="data" key={coin.id}>
                      <span>{coin.symbol} </span> 
                      {/* OPTION B : <span>    <ContactDetail id={ coin.id} />  </span>*/}
                      </div>  
                  })}   
              </div>
            )} 
        </div>
    );
}
export default FinanceWidget;