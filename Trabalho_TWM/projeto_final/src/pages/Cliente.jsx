import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 



const Cliente = () => {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [idade, setIdade] = useState('');
    const [carregaCliente, setCarregaCliente] = useState(false);
    const [insereCliente, setInsereCliente] = useState(false);
    const [atualizaCliente, setAtualizaCliente] = useState(false);
    const [deletaCliente, setDeletaCliente] = useState(false);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        if (carregaCliente) {
            console.log('Carrega cliente');
            setCarregaCliente(false);
            fetch("http://localhost:5000/allclientes", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos clientes:");
                    console.log(data);
                    setClientes(data); 
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaCliente]);


    useEffect(() => {
        if(insereCliente){
            console.log("Insere cliente");
            let cliente = {};
            setInsereCliente(false);
            cliente = {
                "nome": nome,
                "endereco": endereco,
                "email": email,
                "cpf": cpf,
                "dataNascimento": dataNascimento,
            };
            console.log(cliente);
            fetch("http://localhost:5000/inserir_clientes", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(cliente)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereCliente]);

    useEffect(() => {
        if(deletaCliente){
            console.log("Deleta cliente");
            setDeletaCliente(false);
            let idCliente = {
                "id": id,
            };
            console.log(idCliente);
            fetch("http://localhost:5000/deletar_clientes", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idCliente})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaCliente]);

    useEffect(() => {
        if (atualizaCliente) {
            console.log("Atualiza cliente");
            setAtualizaCliente(false);
            let cliente = {
                "nome": nome,
                "endereco": endereco,
                "email": email,
                "cpf": cpf,
                "dataNascimento": dataNascimento,
            };
            fetch(`http://localhost:5000/atualizar_clientes/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaCliente]);

   

    const handleCarregaCliente = () => {        
        setCarregaCliente(true);
    }
    const handleInsereCliente = () => {
        setInsereCliente(true);   
    }
    const handleDeletaCliente = () => {
        setDeletaCliente(true);
    };
    const handleAtualizaCliente = () => {
        setAtualizaCliente(true);
    };

    return (
        <div>
            <Container>
            <h1 className='titulo'>Cadastro de Clientes</h1>
    
                <Row> 
                    <Col sm={3}>
                        <label>Nome </label>
                        <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Col>            
                    <Col sm={3}>
                        <label>Email </label>
                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                    <Col sm={3}>
                        <label>Endereço </label>
                        <input type="text" className="form-control" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                    </Col>
                    <Row></Row>
                    <Col sm={3}>
                        <label>CPF</label>
                            <InputMask
                                mask="999.999.999-99"
                                className="form-control"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                    </Col>
                    <Col sm={3}>
                        <label>Data de Nascimento</label>
                            <InputMask
                                mask="99/99/9999"
                                className="form-control"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />
                    </Col>    
                    <Col sm={3}>
                        <label>ID </label>
                        <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                    </Col>
          
                </Row>
            </Container>
            <br />
            <br />
            <button  onClick={handleInsereCliente}>Inserir cliente</button> {"   "}
            <button onClick={handleCarregaCliente}>Carregar cliente</button> {"   "}
            <button onClick={handleDeletaCliente}>Deletar cliente</button> {"   "}
            <button onClick={handleAtualizaCliente}>Atualizar cliente</button> {"   "}
            <br />
            <br />       
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        <strong>ID:</strong> {cliente.id} | 
                        <strong> Nome:</strong> {cliente.nome} | 
                        <strong> Email:</strong> {cliente.email} |
                        <strong> Endereço:</strong> {cliente.endereco} |
                        <strong> CPF:</strong> {cliente.cpf} |
                        <strong> Data de Nascimento:</strong> {cliente.dataNascimento} |
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Cliente;