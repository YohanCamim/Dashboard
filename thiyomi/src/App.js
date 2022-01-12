import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logout from './pages/Logout';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [token, setToken] = useState(localStorage.getItem("ownTokken"))
  const signUserOut = () => {
      setIsAuth(false);
      window.location.pathname = "/";
  };

  useEffect(function () {
    
    const timer = setInterval( setToken(localStorage.getItem("ownTokken")),   30000)

    return ()=> {
      clearInterval(timer)
    }
  }, [])




return (
  <Router>
    <nav>
      <Link to="/">HOME</Link>
      {/* { !isAuth ? ( 
        <> */}
      <Link to="/login">LOGIN</Link>
          <Link to="/register">REGISTER</Link>            
        {/* </>
      ) : ( */}
  
      <div className="google" onClick={signUserOut}><Logout /></div>      
      {/* )} */}
    </nav>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
  );
}
export default App;







// GOOGLE PLATEFORME FAIT AVEC hoareaum@gmail.com 
      // http://localhost:8080
      // VOTRE CLIENT ID: 55375072345-hlvm9ilaoaa5algfoutr3qlmas8sohu5.apps.googleusercontent.com
      // VOTRE CODE SECRET CLIENT: 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


          {/* <div className="App"> */}






          // OPTIION B si nous avions du passé des paramètres
// export const ContactDetail = ({id}) => {
//   const {data} = useContactQuery (id);
//   return (
//     <pre>{JSON.stringify(data, undefined, 2)}</pre>
//   )
// }