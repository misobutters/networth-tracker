import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
