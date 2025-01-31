const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/Sample');
}

connect()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = connect;




