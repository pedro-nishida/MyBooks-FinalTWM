import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 

const Tecnico = () => {
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
    const [salario, setSalario] = useState('');
    const [cargo, setCargo] = useState('');
    const [carregaTecnico, setCarregaTecnico] = useState(false);
    const [insereTecnico, setInsereTecnico] = useState(false);
    const [atualizaTecnico, setAtualizaTecnico] = useState(false);
    const [deletaTecnico, setDeletaTecnico] = useState(false);
    const [tecnicos, setTecnicos] = useState([]);


    useEffect(() => {
        if (carregaTecnico) {
            console.log('Carrega tecnico');
            setCarregaTecnico(false);
            fetch("http://localhost:5000/alltecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos técnicos:");
                    console.log(data);
                    setTecnicos(data);
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaTecnico]);

    useEffect(() => {
        if(insereTecnico){
            console.log("Insere tecnico");
            let tecnico = {};
            setInsereTecnico(false);
            tecnico = {
                "nome": nome,
                "endereco": endereco,
                "email": email,
                "cpf": cpf,
                "dataNascimento": dataNascimento,
                "salario": salario,
                "cargo": cargo,
            };
            console.log(tecnico);
            fetch("http://localhost:5000/inserir_tecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(tecnico)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereTecnico]);

    useEffect(() => {
        if(deletaTecnico){
            console.log("Deleta tecnico");
            setDeletaTecnico(false);
            let idTecnico = {
                "id": id,
            };
            console.log(idTecnico);
            fetch("http://localhost:5000/deletar_tecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idTecnico})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaTecnico]);

    useEffect(() => {
        if (atualizaTecnico) {
            console.log("Atualiza tecnico");
            setAtualizaTecnico(false);
            let tecnico = {
                "nome": nome,
                "endereco": endereco,
                "email": email,
                "cpf": cpf,
                "dataNascimento": dataNascimento,
                "salario": salario,
                "cargo": cargo,
            };
            fetch(`http://localhost:5000/atualizar_tecnicos/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(tecnico)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaTecnico]);

   

    const handleCarregaTecnico = () => {        
        setCarregaTecnico(true);
    }
    const handleInsereTecnico = () => {
        setInsereTecnico(true);   
    }
    const handleDeletaTecnico = () => {
        setDeletaTecnico(true);
    };
    const handleAtualizaTecnico = () => {
        setAtualizaTecnico(true);
    };

    return (
        <div>
            <Container>
            <h1 className='titulo'>Cadastro de Tecnicos</h1>
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
                        <label>Salário </label>
                        <input type="text" className="form-control" value={salario} onChange={(e) => setSalario(e.target.value)} />
                    </Col>
                    <Col sm={3}>
                        <label>Cargo </label>
                        <input type="text" className="form-control" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                    </Col>
                    <Col sm={3}>
                        <label>ID </label>
                        <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                    </Col>            
                </Row>
            </Container>
            <br />
            <br />
            
            <button onClick={handleInsereTecnico}>Inserir tecnico</button> {"   "}
            <button onClick={handleCarregaTecnico}>Carregar tecnico</button> {"   "}
            <button onClick={handleDeletaTecnico}>Deletar tecnico</button> {"   "}
            <button onClick={handleAtualizaTecnico}>Atualizar tecnico</button> {"   "}
            <br />
            <br />       
            <ul>
                {tecnicos.map((tecnico) => (
                    <li key={tecnico.id}>
                        <strong>ID:</strong> {tecnico.id} | 
                        <strong> Nome:</strong> {tecnico.nome} | 
                        <strong> Email:</strong> {tecnico.email} |
                        <strong> Endereço:</strong> {tecnico.endereco} |
                        <strong> CPF:</strong> {tecnico.cpf} |
                        <strong> Data de Nascimento:</strong> {tecnico.dataNascimento} |
                        <strong> Salário:</strong> {tecnico.salario} |
                        <strong> Cargo:</strong> {tecnico.cargo} |
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tecnico;