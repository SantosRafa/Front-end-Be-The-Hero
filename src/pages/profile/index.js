import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const nameOng = localStorage.getItem('nameOng');
    const IdOng = localStorage.getItem('ongId');

    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization:IdOng,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    },[IdOng]);

    async function handleDeleteIncident(id){
        try{
           await api.delete(`/incidents/${id}`,{
               headers:{
                   Authorization:IdOng
               }
           });
           setIncidents(incidents.filter(incidents=> incidents.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.', err);
        }
    };

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>{`Bem Vinda ${nameOng}`}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick ={handleLogout} type="button">
                    <FiPower size={18} color="E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-Br',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20}  color="#A8A8E2"/>
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    );
}