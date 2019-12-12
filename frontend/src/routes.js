import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main/index';
import Initial from './pages/Initial/index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Initial} />
            <Route path="/pontos-coleta" component={Main} />
        </BrowserRouter>
    );
}