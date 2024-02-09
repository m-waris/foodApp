const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = 4000;
const mongodb = require('./db');
app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());


mongodb();

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/api', require('./Routes/CreateUsers'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

   
    app.listen(port, () => {
        console.log('Server started on port 4000');
    });


