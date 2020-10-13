const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://organicUser:Bangladesh331551@cluster0.plevr.mongodb.net/node-mongo-crud?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    //res.send('Would be good to send data!');
    res.sendFile( __dirname + '/index.html');
})


client.connect(err => {
    const productsCollection = client.db("node-mongo-crud").collection("products");
    //console.log('Yah, Database connected!');
    // const products = {        
    //     name: "HP Laptop",
    //     color: "Silver",
    //     size: {h:1.5, w: 1, uom: 0.5}    
    // }
    app.post("/addProduct", (req, res) => {
        const product = req.body;
        console.log(product);
        // productsCollection.insertOne(products)
        // .then( result => {        
        // console.log("Data saved in DB successfully");
        // })   
        productsCollection.insertOne(product)     
        .then( result => {
            console.log('data added successfully');
            res.send('Success in sending data in DB');
        })
        
    })    

//   client.close();
});


app.listen(3000);