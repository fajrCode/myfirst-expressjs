const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('<h2>This is Homepage</h2>')
})

app.get('/product',(req,res)=>{
    res.send('<h2>This is product page</h2>')
})

app.get('/about',(req,res)=>{
    res.send('<h2>This is about page</h2>')
})

app.get('*',(req,res)=>{
    res.send('<h2>Error 404, Page not Found</h2>')
})

app.listen(5000, (req, res)=>{
    console.log('listening on host http://localhost:5000');
})