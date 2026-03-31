import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();
let meuResultado = [];

const animesJson = path.join(__dirname, 'animes.json');

meuResultado = JSON.parse(fs.readFileSync(animesJson, 'utf-8'));


router.get('/animes', (req, res) => {
  res.json(meuResultado);

});

router.post('/animes', (req, res) => {

  const {nome, votos} = req.body;
  const novoId = meuResultado.length + 1; 
  console.log("NOVO ANIME ADICIONADO:");
  const novoAnime = { id: novoId, nome, votos };

  meuResultado.push(novoAnime); 
  res.status(201).json(["Item adicionado", novoAnime]);

  console.log("RESULTADOS ATUALIZADOS:");
  console.log(meuResultado);
});

router.get('/animes/:id', (req, res) => {
    const { id } = req.params;
    const index = meuResultado.findIndex(item => item.id == id);
    if (index !== -1) {
        res.json(meuResultado[index]);
    } else {
        res.status(404).json({ mensagem: "Item não encontrado" });
    }
});

router.put('/animes/:id', (req, res) => {
    const { id } = req.params;
    const index = meuResultado.findIndex(item => item.id == id);

    if (index !== -1) {
        meuResultado[index] = { ...meuResultado[index], ...req.body };
        res.json({ mensagem: "Item atualizado!", item: meuResultado[index] });
    } else {
        res.status(404).json({ mensagem: "Item não encontrado" });
    }
});

router.put('/animes/votos/:id', (req, res) => {
    const { id } = req.params;
    const index = meuResultado.findIndex(item => item.id == id);

    if (index !== -1) {
        meuResultado[index] = { ...meuResultado[index], votos: meuResultado[index].votos + 1 };
        res.json({ mensagem: "Obrigado pelo su voto UP +1", item: meuResultado[index] });
    } else {
        res.status(404).json({ mensagem: "Item não encontrado" });
    }
});

router.delete('/animes/:id', (req, res) => {
  const { id } = req.params;
    const tamanhoOriginal = meuResultado.length;
    meuResultado = meuResultado.filter(item => item.id != id);

    if (meuResultado.length < tamanhoOriginal) {
        res.json({ mensagem: "Item removido com sucesso" });
    } else {
        res.status(404).json({ mensagem: "Item não encontrado" });
    }
});







router.get('/filmes', (req, res) => {
  const results = [];
  const csvPath = path.resolve(__dirname, 'top100filmes.csv');

  fs.createReadStream(csvPath)
    .pipe(csv({
      // Converte colunas específicas para números
      mapValues: ({ header, value }) => {
        if (header === 'id' || header === 'votos') return Number(value);
        return value;
      }
    }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      res.status(500).send("Erro ao processar a base de dados");
    });
});

export default router;