import React, { Component } from 'react';
import api from '../../services/api';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import './styles.css';

const schema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é um campo obrigatório'),
    price: Yup.string()
      .required('Endereço é um campo obrigatório'),
  });

export default class Modal extends Component {
    state = {
        name: '',
        address: '',
        disableEditBtn: true,
        disableDeleteBtn: false,
        loading: false,
    };

    componentDidUpdate(prevProps){
        if (this.props.value !== prevProps.value) {
            this.setState({
                name: this.props.value.name,
                address: this.props.value.address,
            });
        }
    }

    handleModal = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    handleSubmit = async () => {
        this.setState({ 
            disableDeleteBtn: true, 
            disableEditBtn: true 
        });
        await api.put('pontos-coleta', {
            name: this.props.value.name,
            newInfo: {
                name: this.state.name,
                address: this.state.address,
            }
        });

        this.setState({ 
            disableDeleteBtn: false 
        });
        this.handleModal();
        this.props.update();
    }

    handleDelete = async () => {
        this.setState({ 
            disableDeleteBtn: true, 
            disableEditBtn: true 
        });

        await api.delete(`pontos-coleta/${this.props.value.name}`);

        this.setState({ 
            disableDeleteBtn: false 
        });
        this.handleModal();
        this.props.update();
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value, 
            disableEditBtn: false 
        });
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.handleModal}>&times;</span>
                    </div>
                    <Form id="edit-point"  onSubmit={this.handleSubmit} schema={schema}>
                        <div className="modal-body">
                                <label>Nome: </label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Nome do Ponto"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />

                                <label>Endereço: </label>
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="Endereço"
                                    onChange={this.handleChange}
                                    value={this.state.address}
                                />
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleSubmit} id="editButton" type="submit" disabled={this.state.disableEditBtn}>Editar</button>
                            <button onClick={this.handleDelete} id="deleteButton" type="button" disabled={this.state.disableDeleteBtn}>Deletar</button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}