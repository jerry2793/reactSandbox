import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import Welcome from './components/welcome'


// putting route logics into index main page lets u focus on making UI, not routes
ReactDOM.render(
    <BrowserRouter>
    
        <App>

            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={Welcome} />

        </App>
    
    </BrowserRouter>    
    , document.querySelector('#root')
)