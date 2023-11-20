const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(5000, ()=>{
    console.log('listening on host http://localhost:5000');
})