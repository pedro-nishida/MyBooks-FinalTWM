import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 

const Ordem = () => {
    const [relatos, setRelatos] = useState([]);
    const [carregaRelato, setCarregaRelato] = useState(false);


    useEffect(() => {
        if (carregaRelato) {
            console.log('Carrega relato');
            setCarregaRelato(false);
            fetch("http://localhost:5000/allrelatos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos relatos:");
                    console.log(data);
                    setRelatos(data);
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaRelato]);

    
    const handleCarregaRelato = () => {        
        setCarregaRelato(true);
    }

    return (
        <Container>
           <div>
           <br />
           <br />
           <br />
           
            <h1 className='titulo'>Histórico de Ordens de Serviço</h1>
            <br />
            <ul>
                {relatos.map((relato) => (
                    <li key={relato.id}>
                        <strong>ID do Relato:</strong> {relato.id} |
                        <strong> Descrição do Relato:</strong> {relato.descricao} | 
                        <strong> Assinatura do Técnico:</strong> {relato.assinatura} |
                        <strong> Data do Relato:</strong> {relato.data} |
                        <strong>ID do Chamado:</strong> {relato.idChamado} |
                    </li>
                ))}
            </ul>
            <br />
            <button onClick={handleCarregaRelato}>Atualizar</button>

            </div>
        </Container>
    );
    };
    
    export default Ordem;