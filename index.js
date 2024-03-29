const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// mongo url


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dnqomnb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const  firstCollection = client.db('beatrix').collection('first');
    const  middleCollection = client.db('beatrix').collection('middle');
    const  todaysCollection = client.db('beatrix').collection('todays');

    app.get('/first', async(req,res)=>{
        const corsor = firstCollection.find();
        const result = await corsor.toArray();
        res.send(result)
    })

    app.get('/middle', async(req,res)=>{
      const corsor = middleCollection.find();
      const result = await corsor.toArray();
      res.send(result)
  })

  app.get('/todays', async(req,res)=>{
    const corsor = todaysCollection.find();
    const result = await corsor.toArray();
    res.send(result)
})
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Beatrix is running')
})

app.listen(port, () => {
    console.log(`Beatrix Server is running on port ${port}`)
})