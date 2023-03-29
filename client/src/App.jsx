import React from 'react'
import Index from './components/index';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import LoginPage from './components/page/login';
import useToken from './token/useToken';
import ForgotPage from './components/index/forgot';
import Resetpassword from './components/page/resetpass';
import BarangPage from './components/index/barang'
import CategoryPage from './components/index/category';
import Transaction from './components/index/transaction';
import Report from './components/index/reports';
import Applog from './components/index/applog';

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
                    < Route exact path='/' render={(props) => <Index />}></Route>
                    < Route exact path='/products' render={(props) => < BarangPage/>}></Route>
                    < Route exact path='/app-log' render={(props) => < Applog/>}></Route>
                    < Route exact path='/transaction' render={(props) => < Transaction/>}></Route>
                    < Route exact path='/category' render={(props) => < CategoryPage/>}></Route>
                    < Route exact path='/movehistories' render={(props) => < Report/>}></Route>
                </Switch>
            </Router>
        </div>
    )
   
    
}


export default App;