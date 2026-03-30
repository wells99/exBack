import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ status: 'Ok', message: 'servidor rodando' });
});

app.use('/api', router)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});