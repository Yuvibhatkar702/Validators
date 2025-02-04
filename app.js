const express = require('express');
const connect = require('./config/connect');
const {user, addValidation} = require('./models/registation');
const {userSchemaInsta,schemaVallidation} = require("./models/instagram");
const regSchema = require('./models/reg');  
const postModel = require('./models/post');

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

// app.post("/create" , async (req,res) => {
   
//     let {username,email,password} = req.body;

//     let error = schemaVallidation({username,email,password});

//     if(error){
//         return res.status(400).send(error.message);
//     }else{
//         let User =  await userSchemaInsta.create({
//             username: req.body.username,
//             email : req.body.email, 
//             password : req.body.password
//         })

//         res.send(User);
//     }
    

    
// })

// app.get("/create/:username/post" , async (req,res) => {
   

//     let user = await userSchemaInsta.findOne({username : req.params.username});
//     user.post.push({
//         Containe: "This is my Secound post"
//     })
//     user.save();
//     res.send(user);
// })

app.post("/create", async (req,res) => {
    let {username,email,password} = req.body;
    const done = await regSchema.create(
        {
            username: username,
            email: email,
            password: password
        }
    )
    res.send(done);    
})

app.get("/create/:email/post", async (req,res) => {
    let email  = await regSchema.findOne({email : req.params.email});

    if (!email) {
        return res.status(404).send("User not found");
    }

    let pot = await postModel.create({
        Containe: "This is my first post",
        user : email._id,
    })

    email.post.push(pot._id);
    await email.save();

    res.send({email,pot});
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})

