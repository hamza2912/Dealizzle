import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/';
import ProductPage from './components/ProductPage';
import Clearance from "./components/Clearance/Clearance";


export class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/home" />
                )} />
                <Route exact path="/home" component={LandingPage} />
                <Route exact path="/product/:id"><ProductPage open={this.props.open} /></Route>
                <Route exact path="/clearnece" component={Clearance} />

            </Switch>
        )
    }
}
