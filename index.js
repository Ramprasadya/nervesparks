const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/fact/:id', (req, res) => {
    let num= req.params.id;
    console.log(num)
    let i=1;
    let fact=1;
    for(i=1;i<=num;i++)
        fact*=i;
    let response={"factorial":fact};
    res.send(response)
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})