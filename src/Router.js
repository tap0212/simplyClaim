import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/dashboard'
export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}
