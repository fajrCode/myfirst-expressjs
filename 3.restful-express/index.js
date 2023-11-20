const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("<h5>Respone get success</h5>");
})

app.post('/',(req,res)=>{
    res.send("<h5>Respone post success</h5>")
})

app.listen(5000, ()=>{
    console.log('listen http://localhost:5000')
})
