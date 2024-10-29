const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

//app.get("/", (req, res) => {
//    res.send("Maravilha!");
//})

//app.get("/about", (req, res) => {
//    res.send("Dentro do ABOUT!!");
//})


// CLIENTES
id_cliente_global = 1;

//Lista inicial de clientes
let clientes = [
    {
    "id": 1,
    "nome" : "Miguel",
    "email" : "miguel@teste.com",
    "endereco" : "",
    "cpf" : "123.456.789-10",
    "cep" : "38409-085",
    "bairro" : "Novo Mundo",
    "localidade" : "Av. Victor Alves Pereira",
    "cidade" : "Uberlândia",
    "uf" : "MG",
    "complemento" : "",
    "dataNascimento" : "10/10/1980",
    "idade": 45
    }
]

//Carrega um cliente pelo id
app.get("/carregar_clientes", (req, res) => { 
    cliente =  req.query.nome;
    cliente_retorno = {}
    for (let i = 0; i < clientes.length; i++) {
        if (cliente == clientes[i].nome){
            console.log("Cliente encontrado!");
            console.log(cliente);
            cliente_retorno = clientes[i]
            //console.log("Lista de clientes:"); 
            //console.log(clientes); 
            break;
        }        
    }      
    res.json(cliente_retorno);
})

//Carrega todos os clientes
app.get("/allclientes", (req, res) => { //req.query.id
    console.log("Lista de clientes:"); 
    console.log(clientes); 
    res.json(clientes);
})

//Insere um novo cliente
app.post("/inserir_clientes", (req, res) => {
    cliente = req.body;
    console.log("Cliente Inserido!");
    console.log(cliente);
    id_cliente_global++;
    cliente.id = id_cliente_global;
    clientes.push(cliente);
    //console.log("Lista de clientes:"); 
    //console.log(clientes);    
    res.json(clientes);
})

//Atualiza um cliente pelo id
app.put("/atualizar_clientes/:id", (req, res) => {
    idCliente = parseInt(req.params.id);  
    clienteAtualizado = req.body;   
    let cliente_retorno = null;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id === idCliente) {  
            clientes[i] = { ...clientes[i], ...clienteAtualizado };  
            cliente_retorno = clientes[i];  
            console.log("Cliente atualizado!");
            console.log(cliente);
            break;  
        }
    }
    if (cliente_retorno) {
        res.json(cliente_retorno); 
    } else {
        res.status(404).json({ error: "Cliente não encontrado" });  
    }
    //console.log("Lista de clientes:"); 
    //console.log(clientes); 
});

//Deleta um cliente pelo id
app.delete("/deletar_clientes", (req, res) => {
    excluirId = req.body.idCliente.id;
    let cliente_retorno = null;
    for (let i = 0; i < clientes.length; i++) {
        if (excluirId == clientes[i].id){
            console.log("Cliente deletado!");
            console.log(cliente);
            cliente_retorno = clientes[i];  
            clientes.splice(i,1);
            break;
        }        
    }
    if (cliente_retorno) {
        res.json(cliente_retorno); 
    } else {
        res.status(404).json({ error: "Cliente não encontrado" });  
    }
    //console.log("Lista de clientes:"); 
    //console.log(clientes);
});


// PRODUTOS
let id_produto_global = 1;

// Lista inicial de produtos
let produtos = [
    {
        "id": 1,
        "nome": "Produto A",
        "descricao": "Produto de alta qualidade",
        "preco": 29.99,
        "estoque": 100,
        "categoria": "Eletrônicos",
        "dataCadastro": "01/01/2022"
    }
];

// Carrega um produto pelo id
app.get("/carregar_produto", (req, res) => {
    idProduto = req.query.id;
    produto_retorno = null;
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === idProduto) {
            produto_retorno = produtos[i];
            break;
        }
    }
    if (produto_retorno) {
        res.json(produto_retorno);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

// Obtem todos os produtos
app.get("/allprodutos", (req, res) => {
    res.json(produtos);
});

// Insere um novo produto
app.post("/inserir_produto", (req, res) => {
    produto = req.body;
    id_produto_global++;
    produto.id = id_produto_global;
    produtos.push(produto);
    res.json(produtos);
});

// Atualiza um produto pelo ID
app.put("/atualizar_produto/:id", (req, res) => {
    id = parseInt(req.params.id);
    updatedProduto = req.body;
    let produto_retorno = null;
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {
            produtos[i] = { ...produtos[i], ...updatedProduto };
            produto_retorno = produtos[i];
            console.log("Produto atualizado!");
            break;
        }
    }
    if (produto_retorno) {
        res.json(produto_retorno);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

// Deleta um produto pelo ID
app.delete("/deletar_produtos", (req, res) => {
    excluirId = req.body.idProduto.id;
    let tecnico_retorno = null;
    for (let i = 0; i < produtos.length; i++) {
        if (excluirId == produtos[i].id){
            console.log("Produto deletado!");
            tecnico_retorno = produtos[i];  
            produtos.splice(i,1);
            break;
        }        
    }
    if (tecnico_retorno) {
        res.json(tecnico_retorno); 
    } else {
        res.status(404).json({ error: "Produto não encontrado" });  
    }
});

// TÉCNICOS
id_tecnico_global = 1;

let tecnicos = [
    {
        "id": 1,
        "nome" : "Ana",
        "email" : "ana@teste.com",
        "endereco" : "Rua das Flores, 123",
        "cpf" : "987.654.321-00",
        "cep" : "70000-000",
        "bairro" : "Centro",
        "localidade" : "Belo Horizonte",
        "cidade" : "Belo Horizonte",
        "uf" : "MG",
        "complemento" : "Apto 101",
        "dataNascimento" : "15/05/1990",
        "idade": 34,
        "salario": "R$1000.00",
        "cargo": "tecnico"
    }
]

// Carrega um técnico pelo id
app.get("/carregar_tecnico", (req, res) => {
    idTecnico = req.query.id;
    tecnico_retorno = null;
    for (let i = 0; i < tecnicos.length; i++) {
        if (tecnicos[i].id === idTecnico) {
            tecnico_retorno = tecnicos[i];
            break;
        }
    }
    if (tecnico_retorno) {
        res.json(tecnico_retorno);
    } else {
        res.status(404).json({ error: "Técnico não encontrado" });
    }
});

// Carrega todos os técnicos
app.get("/alltecnicos", (req, res) => { 
    res.json(tecnicos);
})

// Insere um novo técnico
app.post("/inserir_tecnicos", (req, res) => {
    tecnico = req.body;
    id_tecnico_global++;
    tecnico.id = id_tecnico_global;
    tecnicos.push(tecnico); 
    res.json(tecnicos);
})

// Atualiza um técnico pelo ID
app.put("/atualizar_tecnicos/:id", (req, res) => {
    idTecnico = parseInt(req.params.id);  
    tecnicoAtualizado = req.body;   
    let tecnico_retorno = null;
    for (let i = 0; i < tecnicos.length; i++) {
        if (tecnicos[i].id === idTecnico) {  
            tecnicos[i] = { ...tecnicos[i], ...tecnicoAtualizado };  
            tecnico_retorno = tecnicos[i];  
            console.log("Técnico atualizado!");
            break;  
        }
    }
    if (tecnico_retorno) {
        res.json(tecnico_retorno); 
    } else {
        res.status(404).json({ error: "Técnico não encontrado" });  
    }
});

// Deleta um técnico pelo ID
app.delete("/deletar_tecnicos", (req, res) => {
    excluirId = req.body.idTecnico.id;
    let tecnico_retorno = null;
    for (let i = 0; i < tecnicos.length; i++) {
        if (excluirId == tecnicos[i].id){
            console.log("Técnico deletado!");
            tecnico_retorno = tecnicos[i];  
            tecnicos.splice(i,1);
            break;
        }        
    }
    if (tecnico_retorno) {
        res.json(tecnico_retorno); 
    } else {
        res.status(404).json({ error: "Técnico não encontrado" });  
    }
});

// RELATOS
id_relato_global = 0;

let relatos = []

// Carrega um relato pelo id
app.get("/carregar_relato", (req, res) => {
    idRelato = req.query.id;
    relato_retorno = null;
    for (let i = 0; i < relatos.length; i++) {
        if (relatos[i].id === idRelato) {
            relato_retorno = relatos[i];
            break;
        }
    }
    if (relato_retorno) {
        res.json(relato_retorno);
    } else {
        res.status(404).json({ error: "Relato não encontrado" });
    }
});

// Carrega todos os relato
app.get("/allrelatos", (req, res) => { 
    res.json(relatos);
})

// Insere um novo relato
app.post("/inserir_relatos", (req, res) => {
    relato = req.body;
    id_relato_global++;
    relato.id = id_relato_global;
    relatos.push(relato); 
    res.json(relatos);
})

// Atualiza um relato pelo ID
app.put("/atualizar_relatos/:id", (req, res) => {
    idRelato = parseInt(req.params.id);  
    relatoAtualizado = req.body;   
    let relato_retorno = null;
    for (let i = 0; i < relatos.length; i++) {
        if (relatos[i].id === idRelato) {  
            relatos[i] = { ...relatos[i], ...relatoAtualizado };  
            relato_retorno = relatos[i];  
            console.log("Relato atualizado!");
            break;  
        }
    }
    if (relato_retorno) {
        res.json(relato_retorno); 
    } else {
        res.status(404).json({ error: "Relato não encontrado" });  
    }
});

// Deleta um relato pelo ID
app.delete("/deletar_relatos", (req, res) => {
    excluirId = req.body.idRelato.id;
    let relato_retorno = null;
    for (let i = 0; i < relatos.length; i++) {
        if (excluirId == relatos[i].id){
            console.log("Relato deletado!");
            relato_retorno = relatos[i];  
            relatos.splice(i,1);
            break;
        }        
    }
    if (relato_retorno) {
        res.json(relato_retorno); 
    } else {
        res.status(404).json({ error: "Relato não encontrado" });  
    }
});

// CHAMADO
id_chamado_global = 0

let chamados = []

// Carrega um chamados pelo ID
app.get("/carregar_chamado", (req, res) => {
    idChamado = req.query.id;
    chamado_retorno = null;
    for (let i = 0; i < chamados.length; i++) {
        if (chamados[i].id === idChamado) {
            chamado_retorno = chamados[i];
            break;
        }
    }
    if (chamado_retorno) {
        res.json(chamado_retorno);
    } else {
        res.status(404).json({ error: "Chamado não encontrado" });
    }
});

// Carrega todos os chamados
app.get("/allchamados", (req, res) => { 
    res.json(chamados);
})

//Insere um novo chamado
app.post("/inserir_chamados", (req, res) => {
    chamado = req.body;
    console.log("Chamado inserido!");
    console.log(chamado);
    id_chamado_global++;
    chamado.id = id_chamado_global;
    chamados.push(chamado);
    //console.log("Lista de clientes:"); 
    //console.log(clientes);    
    res.json(chamado);
})



app.listen(5000, ()=> console.log("SERVER IS RUNNING!!!"));