const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


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

    //********************* */
        //CREATE PRODUCTS
    //********************* */
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
            //res.send('Success in sending data in DB');
            res.redirect('/');
        })
        
    })    
    //********************* */
        //READ PRODUCTS
    //********************* */
    app.get('/products', (req, res) => {
        productsCollection.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })

    })

    //**************************************************************** */
        //DELETE PRODUCT
    //**************************************************************** */
    app.delete('/delete/:id', (req, res) => {
        //console.log(req.params.id);
        productsCollection.deleteOne({_id: ObjectId(req.params.id) })
        .then( result => {
            // console.log(result);
            res.send( result.deletedCount > 0);
        })
    })

    //**************************************************************** */
        //Show PRODUCT
    //**************************************************************** */
    app.get('/product/:id', (req, res) => {
        productsCollection.find({_id: ObjectId(req.params.id)})
        .toArray( (err, documents) => {
            res.send(documents[0]);
        })
    })

    //**************************************************************** */
        //Update PRODUCT
    //**************************************************************** */
    app.patch('/update/:id', (req, res) => {
        console.log(req.body.price);
        productsCollection.updateOne({_id: ObjectId(req.params.id)},
        {
            $set: { price: req.body.price, quantity: req.body.quantity}
        })
        .then( result => {
            //console.log(result);
            res.send( result.modifiedCount > 0 );
        })
        
    })


//   client.close();
});


app.listen(3000);