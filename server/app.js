const express = require('express')
const cors = require('cors')
const db = require('./db/mysql_db');

const produitRouter = require('./routes/produits');
const ventesRouter = require('./routes/ventes');
const depensesRouter = require('./routes/depenses');
const app = express()

app.use(cors()) 
app.use(express.json())

app.use('/produits',produitRouter);
app.use('/ventes',ventesRouter);
app.use('/depenses',depensesRouter)

//fonction connection a la base de donnees


module.exports = app