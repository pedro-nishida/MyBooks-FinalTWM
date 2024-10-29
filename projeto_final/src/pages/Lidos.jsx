import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 

const Lidos = () => {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setgenero] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [comentario, setComentario] = useState('');
    const [carregaLidos, setCarregaLidos] = useState(false);
    const [insereLidos, setInsereLidos] = useState(false);
    const [atualizaLidos, setAtualizaLidos] = useState(false);
    const [deletaLidos, setDeletaLidos] = useState(false);
    const [Lidoss, setLidoss] = useState([]);

    useEffect(() => {
        if (carregaLidos) {
            console.log('Carrega Livros');
            setCarregaLidos(false);
            fetch("http://localhost:5000/all_lidos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos Livros:");
                    console.log(data);
                    setLidoss(data); 
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaLidos]);


    useEffect(() => {
        if(insereLidos){
            console.log("Insere Livros");
            let Lidos = {};
            setInsereLidos(false);
            Lidos = {
                "titulo": titulo,
                "genero": genero,
                "autor": autor,
                "avaliacao": avaliacao,
                "comentario": comentario,
            };
            console.log(Lidos);
            fetch("http://localhost:5000/inserir_lidos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(Lidos)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereLidos]);

    useEffect(() => {
        if(deletaLidos){
            console.log("Deleta Livros");
            setDeletaLidos(false);
            let idLidos = {
                "id": id,
            };
            console.log(idLidos);
            fetch("http://localhost:5000/deletar_lidos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idLidos})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaLidos]);

    useEffect(() => {
        if (atualizaLidos) {
            console.log("Atualiza Livros");
            setAtualizaLidos(false);
            let Lidos = {
                "titulo": titulo,
                "genero": genero,
                "autor": autor,
                "avaliacao": avaliacao,
                "comentario": comentario,
            };
            fetch(`http://localhost:5000/atualizar_lidos/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Lidos)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaLidos]);

   

    const handleCarregaLidos = () => {        
        setCarregaLidos(true);
    }
    const handleInsereLidos = () => {
        setInsereLidos(true);   
    }
    const handleDeletaLidos = () => {
        setDeletaLidos(true);
    };
    const handleAtualizaLidos = () => {
        setAtualizaLidos(true);
    };

    return (
        <div>
            <Container>
            <h1 className='titulo'>Cadastro de Livros Lidos</h1>
    
                <Row> 
                    <Col sm={3}>
                        <label>Título </label>
                        <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Col>
                    <Col sm={3}>
                        <label>Autor </label>
                        <input type="text" className="form-control" value={autor} onChange={(e) => setAutor(e.target.value)} />
                    </Col> 

                    <Col sm={3}>
                        <label>Avaliação </label>
                        <input type="text" className="form-control" value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)} />
                    </Col>
                    <Row></Row>
                    <Col sm={3}>
                        <label>ID </label>
                        <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                    </Col>  
                    <Col sm={3}>
                        <label>Gênero </label>
                        <input type="text" className="form-control" value={genero} onChange={(e) => setgenero(e.target.value)} />
                    </Col> 
                    <Col sm={3}>
                        <label>Comentário </label>
                        <input type="text" className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} />
                    </Col> 
                </Row>
            </Container>
            <br />
            <br />
            <button  onClick={handleInsereLidos}>Inserir Livros</button> {"   "}
            <button onClick={handleCarregaLidos}>Carregar Livros</button> {"   "}
            <button onClick={handleDeletaLidos}>Deletar Livros</button> {"   "}
            <button onClick={handleAtualizaLidos}>Atualizar Livros</button> {"   "}
            <br />
            <br />       
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
        </div>
    )
}

export default Lidos;