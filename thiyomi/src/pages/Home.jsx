import { React, useEffect, useState, createElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BitcoinSelectBox from '../components/bitcoinSelectBox'
import MeteoSelectBox from '../components/MeteoSelectBox';
import CovidSelectBox from '../components/CovidSelectBox';
import LoveSelectBox_ from '../components/loveSelectBox_';
import LoveSelectBox from '../components/loveSelectBox'
import { addUserChange, clearUserChange } from '../features/userSlice';
import { useAddPreferenceMutation } from "../services/apiAuth"

function Home() {

    //store & global variables
    const bitcoin = useSelector((state) => state.bitcoin)
    const meteo = useSelector((state) => state.meteo)
    const love = useSelector((state) => state.love)
    const covid = useSelector((state) => state.covid)
    const user = useSelector((state) => state.user)

    const token = localStorage.getItem("ownTokken")
    const services = []
    services.push({"services": "crypto", "params":["bitcoin","eur"], "_id":"new", "component": BitcoinSelectBox})
    services.push({"services": "meteo", "params":["lyon"], "_id":"new", "component": MeteoSelectBox})
    services.push({"services": "love", "params":["john","alice"], "_id":"new", "component": LoveSelectBox})
    services.push({"services": "covid", "params":["france"], "_id":"new", "component": CovidSelectBox})

    //hooks
    const dispatch = useDispatch()
    const [chosenPrimaryService, setChosenPrimaryService] = useState(services[0])
    const [serviceAdd, setServiceAdd] = useState(services[0].services)
    const [mut, setMut] = useState(false)

    //queries
    const [AddService] = useAddPreferenceMutation();

    const userHandler = async () => {
        if (token) {
            dispatch(clearUserChange())
            fetch(`http://localhost:3000/widgets/Me`, { method: 'GET', headers: { 'authorization': `Bearer ${token}` }, })
                .then(response => response.json())
                    .then(data => {
                        // console.log(data[0])
                        dispatch(addUserChange(data[0].widgets))});
                        setMut(false)
        localStorage.setItem("isAuth", true)
        }
    }

    const pushService = () => {            
            let preferenceSynthese = {params: ["bitcoin", "eur"], service: "crypto", id: "new"}
            if (chosenPrimaryService == "meteo"){preferenceSynthese = {params: ["lyon"],service: "meteo",id: "new"}}
            if (chosenPrimaryService == "love"){preferenceSynthese = {params: ["john", "alice"],service: "love",id: "new"}}
            if (chosenPrimaryService == "covid"){preferenceSynthese = {params: ["france"],service: "covid",id: "new"}}
            AddService(preferenceSynthese)
            setMut(true)
            // userHandler()
    }
    useEffect(function () {
        userHandler()
      }, [mut])

    let widgets=false
    if (user[0]) {widgets = user[0].length >0}            
    let widgetArray = widgets===true ? user[0] : false

    return (
        <div>
           {/* <p>{JSON.stringify(user)}</p> */}
             <br/>
            <br/>
                {token && (
                <><p>Ajouter un service</p>
                <select
                    value={chosenPrimaryService}
                    name="service-option-1"
                    className="service-options"
                    onChange={(e) => setChosenPrimaryService(e.target.value)}
                >
                {services.map((service, _index) => (<option key={_index}>{service.services}</option>))}
                </select>
                <button onClick={pushService}>Ajouter</button></>)}
                
 
            <LoveSelectBox_ />

            <br />
            <br />
            <br />
            <br />

            

            <div>
               
            </div>
            {/* <p>{JSON.stringify(services)}</p> */}
            <div className='gallery'>
            { token && widgetArray && (widgetArray.map((widget, index) => (
               createElement(
                services.find(elem => elem.services == widget.services).component,
                    {key:index, _id: widget._id, params: widget.params, services: widget.services }
                ))
            ))} {/* <BitcoinSelectBox /> */}
                {/* <p> mes préférences currency sont {JSON.stringify(bitcoin.bitcoin[0][0])}</p> */}
                {/* <p> mes préférences currency sont {JSON.stringify(bitcoin.bitcoin)}</p> */}
                {/* <MeteoSelectBox /> */}
                {/* <p> mes préférences currency sont {JSON.stringify(meteo.meteo)}</p> */}
                {/* <LoveSelectBox /> */}
                {/* <p> mes préférences love sont {JSON.stringify(love.love)}</p>
                <p> mes préférences currency sont {JSON.stringify(meteo.meteo[0])}</p> */}
                <div>
                    {/* {widgetArray?.map((widget, index) =>)} */}
                </div>
            </div>

        </div>
    )
}

export default Home;




//{/* <p>{JSON.stringify(user)}</p> */}
//    <p> mes abonnements : {JSON.stringify(user[0][0].services)}</p> 
//              <p> mes abonnements : {JSON.stringify(user[0][0]._id)}</p> 
//             <p> mes abonnements : {JSON.stringify(user[0])}</p> 

// {/* {widgetArray?.map((widget, index) =>)} */}
 // {/* <p> mes préférences currency sont {JSON.stringify(bitcoin.bitcoin[0][0])}</p> */}

            {/* <p> mes préférences currency sont {JSON.stringify(bitcoin.bitcoin[0])}</p>
            <p> mes préférences love sont {JSON.stringify(love.love)}</p>
            <p> mes préférences meteo sont {JSON.stringify(meteo.meteo[0])}</p> */}