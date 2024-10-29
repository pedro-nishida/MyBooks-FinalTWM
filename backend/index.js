const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

id_lido_global = 2;

let lidos = [
    {
        "id": 1,
        "titulo" : "O Senhor dos Anéis",
        "genero" : "Fantasia",
        "autor" : "J. R. R. Tolkien",
        "avaliacao" : "5",
        "comentario" : "Excelente!",
    },
    {
        "id": 2,
        "titulo" : "A Guerra dos Tronos",
        "genero" : "Fantasia",
        "autor" : "George R. R. Martin",
        "avaliacao" : "5",
        "comentario" : "Excelente!",
    }
];


app.get("/all_lidos", (req, res) => { //req.query.id
    console.log("Lista de Livros lidos:"); 
    console.log(lidos); 
    res.json(lidos);
})

app.post("/inserir_lidos", (req, res) => {
    let lido = req.body;
    console.log("Livro Lido Inserido!");
    console.log(lido);
    id_lido_global++;
    lido.id = id_lido_global;
    lidos.push(lido); // Push the lido object, not the lidos array
    console.log("Lista de lidos:"); 
    console.log(lidos);    
    res.json(lidos);
});

app.put("/atualizar_lidos/:id", (req, res) => {
    let id = parseInt(req.params.id);  
    let lidosAtualizado = req.body;   
    let lidos_retorno = null;

    console.log(`Received request to update id: ${id}`);
    console.log(`Request body: ${JSON.stringify(lidosAtualizado)}`);


    for (let i = 0; i < lidos.length; i++) {
        if (lidos[i].id === id) {
            lidos[i] = { ...lidos[i], ...lidosAtualizado };
            lidos_retorno = lidos[i];
            break;
        }
    }

    if (lidos_retorno) {
        res.json(lidos_retorno); 
    } else {
        res.status(404).json({ error: "Livro Lido não encontrado" });  
    }

});

app.delete("/deletar_lidos", (req, res) => {
    excluirId = req.body.idLidos.id;
    let lidos_retorno = null;
    for (let i = 0; i < lidos.length; i++) {
        if (excluirId == lidos[i].id){
            console.log("Livro Lido deletado!");
            console.log(lidos);
            lidos_retorno = lidos[i];  
            lidos.splice(i,1);
            break;
        }        
    }
    if (lidos_retorno) {
        res.json(lidos_retorno); 
    } else {
        res.status(404).json({ error: "Livro Lido não encontrado" });  
    }
});

let idDesejadoGlobal = 2; // Initial ID, update as new books are added

let desejados = [
    {
        id: 1,
        titulo: "O Alquimista",
        genero: "Ficção",
        autor: "Paulo Coelho",
        dataPub: "1988",
        editora: "HarperCollins",
        status: "Não lido"
    },
    {
        id: 2,
        titulo: "1984",
        genero: "Distopia",
        autor: "George Orwell",
        dataPub: "1949",
        editora: "Secker & Warburg",
        status: "Não lido"
    }
];

// Endpoint to get all desejados books
app.get("/alldesejadoss", (req, res) => {
    console.log("Fetching all desejados books:");
    console.log(desejados);
    res.json(desejados);
});

// Endpoint to insert a new desejado book
app.post("/inserir_desejadoss", (req, res) => {
    const novoDesejado = req.body;
    idDesejadoGlobal++;
    novoDesejado.id = idDesejadoGlobal;
    desejados.push(novoDesejado);
    console.log("New desejado book inserted:");
    console.log(novoDesejado);
    res.json(desejados);
});

// Endpoint to update an existing desejado book
app.put("/atualizar_desejadoss/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    let livroAtualizado = null;

    for (let i = 0; i < desejados.length; i++) {
        if (desejados[i].id === id) {
            desejados[i] = { ...desejados[i], ...dadosAtualizados };
            livroAtualizado = desejados[i];
            break;
        }
    }

    if (livroAtualizado) {
        res.json(livroAtualizado);
    } else {
        res.status(404).json({ error: "Livro desejado não encontrado" });
    }
});

// Endpoint to delete a desejado book
app.delete("/deletar_desejadoss", (req, res) => {
    const { id } = req.body;
    const index = desejados.findIndex(desejado => desejado.id === id);

    if (index !== -1) {
        const [deletedBook] = desejados.splice(index, 1);
        console.log("Desejado book deleted:");
        console.log(deletedBook);
        res.json(deletedBook);
    } else {
        res.status(404).json({ error: "Livro desejado não encontrado" });
    }
});

app.listen(port, ()=> console.log("SERVER IS RUNNING!!!"));