import express from 'express';
import product from './product';

const app = express();

app.use('/product',product);

app.listen(5400,()=> console.log('Server is listening on port 5400'));
