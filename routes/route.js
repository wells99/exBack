import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();

router.get('/animes', (req, res) => {
 const results = [];
 const csvPath = path.resolve(__dirname, 'top100animes.csv');

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