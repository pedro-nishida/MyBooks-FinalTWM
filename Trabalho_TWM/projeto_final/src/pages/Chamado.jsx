import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './Modelo.css'; 

const Chamado = () => {
    const [id, setId] = useState('');
    const [id_cliente, setIdCli] = useState('');
    const [id_produto, setIdProd] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [carregaChamado, setCarregaChamado] = useState(false);
    const [insereChamado, setInsereChamado] = useState(false);

    useEffect(() => {
        if (carregaChamado) {
            setCarregaChamado(false);
            fetch("http://localhost:5000/allchamados")
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
        if(insereChamado){
            console.log("Insere chamado");
            let chamado = {};
            setInsereChamado(false);
            chamado = {
                id_cliente,
                id_produto,
                tipo,
                descricao,
                data,
                localidade,
            };
            console.log(chamado);
            fetch("http://localhost:5000/inserir_chamados", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(chamado)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereChamado]);

    const handleInsereChamado = () => {        
        setInsereChamado(true);
    }

    return (
        <div>
            <Container>
                <br />
            <h1 className='titulo'>Enviar Chamado</h1>


            </Container>

            <label htmlFor="">Id do Cliente</label>
            <input class="form-control" type="text" aria-label="default input example" value={id_cliente} onChange={(e) => setIdCli(e.target.value)}></input>

            <label htmlFor="">Id do Produto</label>
            <input class="form-control" type="text" aria-label="default input example" value={id_produto} onChange={(e) => setIdProd(e.target.value)}></input>

            <label for="exampleDataList" class="form-label">Tipo de serviço</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="" value={tipo} onChange={(e) => setTipo(e.target.value)}/>
            <datalist id="datalistOptions">
            <option value="Reparo"/>
            <option value="Manutenção"/>
            <option value="Instalação"/>
            </datalist>

            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Descrição detalhada do problema ou solicitação</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
            </div>

            <label htmlFor="">Localização do serviço</label>
            <input class="form-control" type="text" aria-label="default input example" value={localidade} onChange={(e) => setLocalidade(e.target.value)}></input>

            <label>Data</label>
                <InputMask
                    mask="99/99/9999"
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            <br />
            <button  onClick={handleInsereChamado}>Enviar</button>

            

        </div>
    )
}

export default Chamado;