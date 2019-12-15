import React, { Component, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import './styles.css'

const schema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é um campo obrigatório'),
    address: Yup.string()
      .required('Endereço é um campo obrigatório'),
  });

class Register extends Component{

    state = {
        loading: false,
        name: '',
        address: '',
        errorMessage: '',
    }

    handleSubmit = async (values, {resetForm}) => {
        this.setState({
            loading: true,
            name: values.name,
            address: values.address,
        });
        const response = await api.post('/pontos-coleta',{
            name: values.name,
            address: values.address,
        }).catch(err => console.log(err));
        if(response.data.name && response.data.address){
            resetForm();
            this.setState({
                loading: false,
                name: '',
                address: '',
                errorMessage: '',
            });
        }else if(!response.data.name){
            this.setState({errorMessage: 'Nome inválido'});
            this.setState({loading: false});
        }else if (!response.data.address){
            this.setState({
                loading: false,
                name: '',
                address: '',
                errorMessage: 'Endereço inválido',
            });
        }

    }

    render() {
        return(
            <div className="register-container">
                <Form id="new-point" schema={schema} onSubmit={this.handleSubmit}>
                    <h1>Cadastrar novo ponto</h1>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome do ponto de coleta"
                    />
        
                    <Input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                    />
                    <p>{this.state.errorMessage}</p>
                    <button type="submit" disabled={this.state.loading}>Cadastrar</button>
                </Form>
            </div>
        );
    }
    
}

export default Register;