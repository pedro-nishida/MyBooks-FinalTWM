import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import './Modelo.css';

const Ordem = () => {
    const [carregaBiblioteca, setCarregaBiblioteca] = useState(false);
    const [Lidoss, setLidoss] = useState([]);
    const [Desejadoss, setDesejadoss] = useState([]);

    useEffect(() => {
        if (carregaBiblioteca) {
            console.log('Carrega Desejados');
            fetch("http://localhost:5000/alldesejadoss", {
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados dos Livros Desejados:", data);
                setDesejadoss(data); 
            })
            .catch((error) => console.log(error));

            console.log('Carrega Lidos');
            fetch("http://localhost:5000/all_lidos", {
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados dos Livros Lidos:", data);
                setLidoss(data); 
            })
            .catch((error) => console.log(error));

            setCarregaBiblioteca(false);
        }
    }, [carregaBiblioteca]);

    const handleCarregaBiblioteca = () => {        
        setCarregaBiblioteca(true);
    };

    return (
        <Container>
            <div>
                <br />
                <h1 className='titulo'>Sua Biblioteca</h1>
                <h2>
                    Lista de Interesse
                </h2>
                <ul>
                    {Desejadoss.map((desejados) => (
                        <li key={desejados.id}>
                            <strong>ID:</strong> {desejados.id} | 
                            <strong> Título:</strong> {desejados.titulo} | 
                            <strong> Gênero:</strong> {desejados.genero} |
                            <strong> Autor:</strong> {desejados.autor} |
                            <strong> Data Publicação:</strong> {desejados.dataPub} |
                            <strong> Editora:</strong> {desejados.editora} |
                            <strong> Status:</strong> {desejados.status} |
                        </li>
                    ))}
                </ul>
                <h2>
                    Já lidos
                </h2>
                <ul>
                    {Lidoss.map((lidos) => (
                        <li key={lidos.id}>
                            <strong>ID:</strong> {lidos.id} | 
                            <strong> Título:</strong> {lidos.titulo} | 
                            <strong> Gênero:</strong> {lidos.genero} |
                            <strong> Autor:</strong> {lidos.autor} |
                            <strong> Avaliação:</strong> {lidos.avaliacao} |
                            <strong> Comentário:</strong> {lidos.comentario} |
                        </li>
                    ))}
                </ul>
                <button onClick={handleCarregaBiblioteca}>Atualizar</button>
            </div>
        </Container>
    );
};

export default Ordem;
