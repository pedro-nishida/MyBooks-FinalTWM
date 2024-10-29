import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 



const Desejados = () => {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [genero, setgenero] = useState('');
    const [autor, setAutor] = useState('');
    const [data_pub, setDataPub] = useState('');
    const [editora, setEditora] = useState('');
    const [status, setStatus] = useState('');
    const [carregaDesejados, setCarregaDesejados] = useState(false);
    const [insereDesejados, setInsereDesejados] = useState(false);
    const [atualizaDesejados, setAtualizaDesejados] = useState(false);
    const [deletaDesejados, setDeletaDesejados] = useState(false);
    const [Desejadoss, setDesejadoss] = useState([]);

    useEffect(() => {
        if (carregaDesejados) {
            console.log('Carrega Livros');
            setCarregaDesejados(false);
            fetch("http://localhost:5000/alldesejadoss", {
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
                    setDesejadoss(data); 
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaDesejados]);


    useEffect(() => {
        if(insereDesejados){
            console.log("Insere Livros");
            let Desejados = {};
            setInsereDesejados(false);
            Desejados = {
                "titulo": titulo,
                "genero": genero,
                "autor": autor,
                "dataPub": data_pub,
                "editora": editora,
                "status": status,
            };
            console.log(Desejados);
            fetch("http://localhost:5000/inserir_desejadoss", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(Desejados)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereDesejados]);

    useEffect(() => {
        if(deletaDesejados){
            console.log("Deleta Livros");
            setDeletaDesejados(false);
            let idDesejados = {
                "id": id,
            };
            console.log(idDesejados);
            fetch("http://localhost:5000/deletar_desejadoss", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idDesejados})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaDesejados]);

    useEffect(() => {
        if (atualizaDesejados) {
            console.log("Atualiza Livros");
            setAtualizaDesejados(false);
            let Desejados = {
                "titulo": titulo,
                "genero": genero,
                "autor": autor,
                "dataPub": data_pub,
                "editora": editora,
                "status": status,
            };
            fetch(`http://localhost:5000/atualizar_desejadoss/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Desejados)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaDesejados]);

   

    const handleCarregaDesejados = () => {        
        setCarregaDesejados(true);
    }
    const handleInsereDesejados = () => {
        setInsereDesejados(true);   
    }
    const handleDeletaDesejados = () => {
        setDeletaDesejados(true);
    };
    const handleAtualizaDesejados = () => {
        setAtualizaDesejados(true);
    };

    return (
        <div>
            <Container>
            <h1 className='titulo'>Cadastro de Livros Desejados</h1>
    
                <Row> 
                    <Col sm={3}>
                        <label>Título </label>
                        <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Col>            
                    <Col sm={3}>
                        <label>Gênero </label>
                        <input type="text" className="form-control" value={genero} onChange={(e) => setgenero(e.target.value)} />
                    </Col><Col sm={3}>
                        <label>Autor </label>
                        <input type="text" className="form-control" value={autor} onChange={(e) => setAutor(e.target.value)} />
                    </Col>
                    <Row></Row>
                    <Col sm={3}>
                        <label>Data Publicação</label>
                            <InputMask
                                mask="99/99/9999"
                                className="form-control"
                                value={data_pub}
                                onChange={(e) => setDataPub(e.target.value)}
                            />
                    </Col>
                    <Col sm={3}>
                        <label>Editora </label>
                        <input type="text" className="form-control" value={editora} onChange={(e) => setEditora(e.target.value)} />
                    </Col>
                    <Col sm={3}>
                        <label>Status </label>
                        <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </Col> 
                    <Col sm={3}>
                        <label>ID </label>
                        <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                    </Col>
          
                </Row>
            </Container>
            <br />
            <br />
            <button  onClick={handleInsereDesejados}>Inserir Livros</button> {"   "}
            <button onClick={handleCarregaDesejados}>Carregar Livros</button> {"   "}
            <button onClick={handleDeletaDesejados}>Deletar Livros</button> {"   "}
            <button onClick={handleAtualizaDesejados}>Atualizar Livros</button> {"   "}
            <br />
            <br />       
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
        </div>
    )
}

export default Desejados;