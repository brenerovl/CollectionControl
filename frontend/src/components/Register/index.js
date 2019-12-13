import React, { Component, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import './styles.css'

const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field'),
    address: Yup.string()
      .required('Address is a required field'),
  });

class Register extends Component{

    state = {
        loading: false,
        name: '',
        address: '',
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
        console.log(response);
        resetForm();
        this.setState({
            loading: false,
            name: '',
            address: '',
        });
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
        
                    <button type="submit" disabled={this.state.loading}>Cadastrar</button>
                </Form>
            </div>
        );
    }
    
}

export default Register;