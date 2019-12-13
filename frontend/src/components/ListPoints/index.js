import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import './styles.css';
import api from '../../services/api';
import Modal from '../Modal/index';

export default function ListPoints(){
    const [points, setPoints] = useState([]);
    const [modalPoint, setModalPoint] = useState({});
    const [pointSearch, setPointSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        var response = await api.get('/pontos-coleta');
        setPoints(response.data);
    }

    const handleModal = async (name) => {
        var response = await api.get(`pontos-coleta/${name}`);

        setModalPoint(response.data);
        console.log(modalPoint);

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    async function handleSubmit(value){
        var response;
        setPointSearch(value);
        if(value){
            response = await api.get(`/pontos-coleta/${value}`);
            setPoints(response.data);
        }
        else {
                response = await api.get('/pontos-coleta');
                setPoints(response.data);
            }
    }

    return(
        <div className="list-container">
            <Form id="search-point" onSubmit={handleSubmit}>
                <Input
                type="text"
                name="searchPoints"
                placeholder="Digite o nome do Ponto de coleta"
                value={pointSearch}
                onChange={e => handleSubmit(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>
            <Modal value={modalPoint} update={fetchData}/>
            <ul>
                {points.map((point) =>
                    <li key={point._id.toString()} onClick={() => handleModal(point.name)}>
                        <p>Nome: {point.name}</p>
                        <p>Endereço: {point.address}</p>
                        <p>Latitude: {point.latitude}</p>
                        <p>Longitude: {point.longitude}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}