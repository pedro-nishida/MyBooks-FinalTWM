import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 

const Relato = () => {
    const [id, setId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idChamado, setIdChamado] = useState('');
    const [assinatura, setAssinatura] = useState('');
    const [data, setData] = useState('');
    const [relatos, setRelatos] = useState([]);

    const [tipoChamado, setTipoChamado] = useState('');
    const [descricaoChamado, setDescricaoChamado] = useState('');
    const [dataChamado, setDataChamado] = useState('');
    const [localidadeChamado, setLocalidadeChamado] = useState('');

    const [carregaRelato, setCarregaRelato] = useState(false);
    const [insereRelato, setInsereRelato] = useState(false);
    const [atualizaRelato, setAtualizaRelato] = useState(false);
    const [deletaRelato, setDeletaRelato] = useState(false);

    const [carregaChamado, setCarregaChamado] = useState(false);
    const [chamados, setChamados] = useState([]);

    useEffect(() => {
        if (carregaChamado) {
            console.log('Carrega chamado');
            setCarregaChamado(false);
            fetch("http://localhost:5000/allchamados", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos chamados:");
                    console.log(data);
                    setChamados(data);
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaChamado]);

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
    
    useEffect(() => {
        if(insereRelato){
            console.log("Insere relato");
            let relato = {};
            setInsereRelato(false);
            relato = {
                idChamado,
                descricao,
                assinatura,
                data
            };
            console.log(relato);
            fetch("http://localhost:5000/inserir_relatos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(relato)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereRelato]);
    
    useEffect(() => {
        if(deletaRelato){
            console.log("Deleta relato");
            setDeletaRelato(false);
            let idRelato = {
                "id": id,
            };
            console.log(idRelato);
            fetch("http://localhost:5000/deletar_relatos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idRelato})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaRelato]);
    
    useEffect(() => {
        if (atualizaRelato) {
            console.log("Atualiza relato");
            setAtualizaRelato(false);
            let relato = {
                idChamado,
                descricao,
                assinatura,
                data
            };
            fetch(`http://localhost:5000/atualizar_relatos/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(relato)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaRelato]);
    
    const handleCarregaChamado = () => {        
        setCarregaChamado(true);
    } 
    
    const handleCarregaRelato = () => {        
        setCarregaRelato(true);
    }
    const handleInsereRelato = () => {
        setInsereRelato(true);   
    }
    const handleDeletaRelato = () => {
        setDeletaRelato(true);
    };
    const handleAtualizaRelato = () => {
        setAtualizaRelato(true);
    };
    
    
    return (
        <Container>
           <div>
            <br />
            <br />
            <br />

            <h1 className='titulo'>Histórico de Chamados</h1>
            <ul>
                {chamados.map((chamado) => (
                    <li key={chamado.id}>
                        <strong>ID do Chamado:</strong> {chamado.id} |
                        <strong>ID do Cliente:</strong> {chamado.id_cliente} |
                        <strong>ID do Produto:</strong> {chamado.id_produto} |
                        <strong> Tipo:</strong> {chamado.tipo} | 
                        <strong> Descrição:</strong> {chamado.descricao} |
                        <strong> Data:</strong> {chamado.data} |
                        <strong> Localidade:</strong> {chamado.localidade} |
                    </li>
                ))}
            </ul>
                <button onClick={handleCarregaChamado}>Carregar Chamados</button>
            <br />
            <br />
            <br />
            <h1 className='titulo'>Cadastro de Relatos</h1>
            <Row>
            <Row>
                <Col sm={20}>
                <label for="exampleFormControlTextarea1" class="form-label">Descrição detalhada do Laudo</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                </Col>
            </Row>
            <Col sm={3}>
                    <label>ID do Chamado</label>
                    <input type="text" className="form-control" value={idChamado} onChange={(e) => setIdChamado(e.target.value)} />
                </Col>
                <Col sm={3}>
                    <label>Assinatura</label>
                    <input type="text" className="form-control" value={assinatura} onChange={(e) => setAssinatura(e.target.value)} />
                </Col>
                <Col sm={3}>
                        <label>Data do Relato</label>
                            <InputMask
                                mask="99/99/9999"
                                className="form-control"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                    </Col> 
                <Col sm={3}>
                    <label>ID do Relato</label>
                    <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                </Col>
            </Row>

            <div className="buttons">
                <button onClick={handleInsereRelato}>Inserir Relato</button> {"   "}
                <button onClick={handleCarregaRelato}>Carregar Relatos</button> {"   "}
                <button onClick={handleAtualizaRelato}>Atualizar Relato</button> {"   "}
                <button onClick={handleDeletaRelato}>Deletar Relato</button> {"   "}
                <br />
            <br />       
            <ul>
                {relatos.map((relato) => (
                    <li key={relato.id}>
                        <strong>ID do Relato:</strong> {relato.id} |
                        <strong> Descrição:</strong> {relato.descricao} | 
                        <strong> Assinatura:</strong> {relato.assinatura} |
                        <strong> Data:</strong> {relato.data} |
                    </li>
                ))}
            </ul>
            </div>
            </div>
        </Container>
    );
    };
    
    export default Relato;

