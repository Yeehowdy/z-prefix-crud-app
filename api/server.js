const express = require('express')
const knex = require('knex')
const cors = require('cors')
const port = 8080

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Something')
})

app.listen(port, () => {
    console.log('Listening on port: ', port)
})