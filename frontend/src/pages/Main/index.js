import React from 'react';

import './styles.css';

import Register from '../../components/Register/index';
import ListPoints from '../../components/ListPoints/index';

export default function Main(){
    return(
        <div className="main-container">
            <Register />
            <ListPoints />
        </div>
    );
}