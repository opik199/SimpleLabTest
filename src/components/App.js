import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import TestSearch from "../components/TestSearch"
import TestList from "../components/TestList"
import Error from "../components/error"

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={TestSearch} exact />
                <Route path="/TestList/:id/:text"><TestList/></Route>
                <Route component={Error} />
            </Switch>
        </main>
    )
}

export default App;

