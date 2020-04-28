import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register(){
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity] = useState('');
    const [ uf, setUf ] = useState('');

    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault()

        const response = await api.post('/ongs',{
            name,
            email,
            whatsapp,
            city,
            uf
        });
        console.log(response);
        try{
            alert(`Seu ID de Acesso: ${response.data.id}`);
            history.push('/');
        }catch{
            alert('Não foi possível realizar o cadastro, tente novamente');
        }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas e encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to ="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para fazer Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    />
                    <input 
                    type="email" 
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}/>
                    
                    <input 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="Whatsapp"/>
                    
                    <div className="input-group">
                        <input 
                        value={city}
                        placeholder="Cidade"
                        onChange={e => setCity(e.target.value)}/>
                        <input 
                        value={uf}
                        placeholder="UF" 
                        onChange={e => setUf(e.target.value)}
                        style={{width:80}}/>
                    </div>

                    <button className="button" type="submit">Cadastar</button>
                </form>
            </div>
        </div>
    )
}