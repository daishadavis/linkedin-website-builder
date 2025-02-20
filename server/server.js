const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes/api.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/template', express.static(path.join(__dirname, 'website-templates')));

app.use('/api',apiRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({err: err.message})
})


const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})