import Home from "./assets/componenets/Home";
import Profile from "./assets/componenets/Profile";
import { Routes,Route } from 'react-router-dom';
import Login from "./assets/componenets/Login";
import Register from "./assets/componenets/Register";
import { ToastContainer } from "react-toastify";

import Card from "./assets/componenets/Productdetaile";


function App(){
   return(
    <>
      <ToastContainer />
    <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
   
        <Route path="/Card" element={<Card/>}></Route>
          <Route path="/product/:id" element={<Card/>}></Route>
          
       
    </Routes>
    </>
   ) 
}

export default App;