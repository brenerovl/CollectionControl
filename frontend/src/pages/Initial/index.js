import React from 'react';

import './styles.css';
import logo from '../../assets/initialImage2.svg';

export default function Inital({ history }){

    function handleClick(){
        history.push('/pontos-coleta');
    }

    return(
        <div className="initial-container">
            <p><strong>CadêLixeira</strong></p>
            <img src={logo} alt="Coleta Seletiva " height="300" />
            <button type="button" onClick={handleClick}>Ver Pontos de Coleta</button>
        </div>
    );
}