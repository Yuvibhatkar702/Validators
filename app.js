const express = require('express');
const connect = require('./config/connect');
const {user, addValidation} = require('./models/registation');
const {userSchemaInsta,schemaVallidation} = require("./models/instagram");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.send("Hello World");
})

// app.post("/register", async (req,res) => {

//     let {name,email,age,mobile,password} = req.body;

//     let error = addValidation({name,email,age,mobile,password});

//     if(error) return res.status(400).send(error.details[0].message);
    
//     res.send("Data is valid");

// })

app.post("/create" , async (req,res) => {
   
    let {username,email,password} = req.body;

    let error = schemaVallidation({username,email,password});

    if(error){
        return res.status(400).send(error.details[0].message);
    }else{
        let User =  await userSchemaInsta.create({
            username: req.body.username,
            email : req.body.email, 
            password : req.body.password
        })

        res.send(User);
    }
    

    
})

app.get("/create/:username/post" , async (req,res) => {
   

    let user = await userSchemaInsta.findOne({username : req.params.username});
    user.post.push({
        Containe: "This is my Secound post"
    })
    user.save();
    res.send(user);
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})

