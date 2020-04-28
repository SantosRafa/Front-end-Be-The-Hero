import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import './styles.css'

import heroesImage from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';


export default function Logon(){
    const [id, setId]= useState('');

    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault();

       
        try{
            const response = await api.post('/sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('nameOng', response.data.name)
            history.push('/profile');
        }catch{
            alert('Falha no Login, tente novamente');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleSubmit}>
                    <h1>Faça seu Logon</h1>

                    <input 
                    value={id}
                    onChange={e=>setId(e.target.value)}
                    placeholder="Sua ID" />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
}