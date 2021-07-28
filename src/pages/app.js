import React from 'react'
import Login from './login'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import ListUser from './listUser';
import Home from './home';
class App extends React.Component{
    render() {
        return (
           <Router>
               <Route exact path="/">
                <Login/>
               </Route>
               <Route exact path="/listUser">
                <ListUser/>
               </Route>
               <Route exact path="/home">
                <Home/>
               </Route>
           </Router>
        );
    }
}

export default App;