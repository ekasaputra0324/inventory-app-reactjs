import React from 'react'
import Index from './components/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/page/login';
import useToken from './token/useToken';



function App() {
    const {token ,setToken } = useToken();
    if (!token) {
        return < LoginPage setToken={setToken} />;
    }
    return ( 
        <div>
            <BrowserRouter>
                <Switch>
                    < Route path='/'>
                        <Index />
                    </Route>
                </Switch>
            </ BrowserRouter>
        </div>
    )
}


export default App;