import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from "./components/App";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('app')
)

// setTimeout(() => {
   // ReactDOM.unmountComponentAtNode(document.getElementById('app'));}, 10000);
