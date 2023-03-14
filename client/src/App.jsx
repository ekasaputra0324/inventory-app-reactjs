import React from 'react'
import Index from './components/index';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import LoginPage from './components/page/login';
import useToken from './token/useToken';
import ForgotPage from './components/index/forgot';
import Resetpassword from './components/page/resetpass';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return (
            <div>
            <Router>
                <Switch>
                    <Route exact path='/' render={(props)  => < LoginPage setToken={setToken} />}></Route> 
                    <Route exact path='/forgot' render={(props)  => < ForgotPage />}></Route>
                    <Route exact path='/reset_password/:token' render={(props)  => < Resetpassword />}></Route> 
               </Switch>
            </Router>
            </div>
        )
    }

    return (
        <div>
            <Router>
                <Switch>
                    < Route path='/'>
                        <Index />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
   
    
}


export default App;