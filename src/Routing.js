import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/';
import ProductPage from './components/ProductPage';


export class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/home" />
                )} />
                <Route exact path="/home" component={LandingPage} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/clearnece"  />
               
            </Switch>
        )
    }
}
