const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const ConnectToMongo = require('./db/db');

ConnectToMongo();


app.use(cors())
// middleware to use json
app.use(express.json());

// Available Routes
app.use('/api/' ,require('./routes/Endpoint'));
app.use('/api/',require('./routes/user'));



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})