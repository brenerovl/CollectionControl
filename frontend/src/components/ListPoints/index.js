import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import './styles.css';
import Modal from '../Modal/index';

export default function ListPoints(){

    const [modalPoint, setModalPoint] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        /* var config = { headers: {'market': localStorage.getItem('user-id')} };

        var response = await api.get('products', config);
        setPoint(response.data); */
    }

    const handleModal = async (id) => {
        /* var response = await api.get(`products/${id}`);
        setModalPoint(response.data); */

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    return(
        <div className="list-container">
            <Modal value={modalPoint} update={fetchData}/>
            <Form id="search-point">
                <Input
                type="text"
                name="searchPoints"
                placeholder="Digite o nome do Ponto de coleta"
                />
                <button>Pesquisar</button>
            </Form>
            <ul>
                <li onClick={() => handleModal('product._id')}>
                    <p>Nome: Fulano</p>
                    <p>Endereço: Lugar</p>
                    <p>Latitude: x</p>
                    <p>Longitude: y</p>
                </li>
                <li>
                    <p>Nome: Fulano</p>
                    <p>Endereço: Lugar</p>
                    <p>Latitude: x</p>
                    <p>Longitude: y</p>
                </li>
                <li>
                    <p>Nome: Fulano</p>
                    <p>Endereço: Lugar</p>
                    <p>Latitude: x</p>
                    <p>Longitude: y</p>
                </li>
                <li>
                    <p>Nome: Fulano</p>
                    <p>Endereço: Lugar</p>
                    <p>Latitude: x</p>
                    <p>Longitude: y</p>
                </li>
                <li>
                    <p>Nome: Fulano</p>
                    <p>Endereço: Lugar</p>
                    <p>Latitude: x</p>
                    <p>Longitude: y</p>
                </li>
            </ul>
        </div>
    );
}