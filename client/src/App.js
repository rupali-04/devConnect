import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route,Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Redux
import {Provider} from "react-redux";
import store from "./store";


function App(){
  return(
  <Provider store={store}>
    <Router>
    <Navbar />
    <Routes>    
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
          
      

    </Routes>
    </Router>
 </Provider>
  )

}
  

export default App;
