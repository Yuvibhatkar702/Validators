const express = require('express');
const connect = require('./config/connect');
const {user, addValidation} = require('./models/registation');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.post("/register", async (req,res) => {

    let {name,email,age,mobile,password} = req.body;

    let error = addValidation({name,email,age,mobile,password});

    if(error) return res.status(400).send(error.details[0].message);
    
    res.send("Data is valid");

})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})

