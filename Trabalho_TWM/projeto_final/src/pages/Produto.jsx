import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 


const Produto = () => {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [carregaProduto, setCarregaProduto] = useState(false);
    const [insereProduto, setInsereProduto] = useState(false);
    const [atualizaProduto, setAtualizaProduto] = useState(false);
    const [deletaProduto, setDeletaProduto] = useState(false);
    const [produtos, setProdutos] = useState([]);


    useEffect(() => {
        if (carregaProduto) {
            setCarregaProduto(false);
            fetch("http://localhost:5000/allprodutos")
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados dos produtos:");
                    console.log(data);
                    setProdutos(data);
                })
                .catch((error) => console.log(error));
        }
    }, [carregaProduto]);

    useEffect(() => {
        if (insereProduto) {
            setInsereProduto(false);
            const produto = {
                nome,
                descricao,
                preco,
            };
            fetch("http://localhost:5000/inserir_produto", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereProduto]);

    useEffect(() => {
        if (atualizaProduto) {
            setAtualizaProduto(false);
            const produto = {
                id,
                nome,
                descricao,
                preco,
            };
            fetch(`http://localhost:5000/atualizar_produto/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [atualizaProduto]);

    useEffect(() => {
        if(deletaProduto){
            console.log("Deleta produto");
            setDeletaProduto(false);
            let idProduto = {
                "id": id,
            };
            console.log(idProduto);
            fetch("http://localhost:5000/deletar_produtos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify({idProduto})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaProduto]);

    const handleCarregaProduto = () => {
        setCarregaProduto(true);
    };

    const handleInsereProduto = () => {
        setInsereProduto(true);
    };

    const handleAtualizaProduto = () => {
        setAtualizaProduto(true);
    };

    const handleDeletaProduto = () => {
        setDeletaProduto(true);
    };

    return (
        <div>
        <Container>
            <h1 className='titulo'>Cadastro de Produtos</h1>
            <Row>
                <Col sm={3}>
                    <label>Nome</label>
                    <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
                </Col>
                <Col sm={3}>
                    <label>Descrição</label>
                    <input type="text" className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </Col>
                <Col sm={3}>
                    <label>Preço</label>
                    
                    <input type="text" className="form-control" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </Col>
                <Col sm={3}>
                    <label>ID</label>
                    <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                </Col>
            </Row>
            <br />
            <br />
            <div className="buttons">
                <button onClick={handleInsereProduto}>Inserir Produto</button> {"   "}
                <button onClick={handleCarregaProduto}>Carregar Produtos</button> {"   "}
                <button onClick={handleAtualizaProduto}>Atualizar Produto</button> {"   "}
                <button onClick={handleDeletaProduto}>Deletar Produto</button> {"   "}
                <br />
            <br />       
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <strong>ID:</strong> {produto.id} | 
                        <strong> Nome:</strong> {produto.nome} | 
                        <strong> Descrição:</strong> {produto.descricao} |
                        <strong> Preço:</strong> {produto.preco} |
                    </li>
                ))}
            </ul>
            </div>
        </Container>
        </div>
    );
};

export default Produto;
