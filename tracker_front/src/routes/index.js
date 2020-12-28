import React from  "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  User  from "../pages/user"
import  Admin  from "../pages/admin"


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                   <Admin/>
                </Route>
                <Route path="/user">
                    <User/>
                </Route>
            </Switch>
        </Router>
    )
}