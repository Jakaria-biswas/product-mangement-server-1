const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;

app.use(cors())
app.use(express.json())
// productmanagement1
// zahFsGFRoMjV8o2M

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://productmanagement1:zahFsGFRoMjV8o2M@cluster0.me6u3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
     const collection = client.db("productmanagement1").collection("products");
     // perform actions on the collection object



     async function run() {
          try {
            /// crete a new product
               app.post('/createProduct', async (req, res) => {
                    const data = req.body;

                    const result = await collection.insertOne(data)
                    if (result.acknowledged == true) {
                         res.send({ statusCode: 200 })
                    }
               //   console.log(data)
               })

               /// get all products

               app.get('/allProducts', async (req,res) => {
                         
                        const result = await collection.find({}).toArray()
                        res.send(result)
                        
               })


               /// delete product

               app.delete('/deleteProduct/:id', async (req,res) => {
                        const id = req.params.id;
                        
                         const result = await  collection.deleteOne({_id:ObjectId(id)})
                         if(result.deletedCount > 0){
                               res.send({delete: 200})
                         }
               })

               /// product fined through category

               app.get('/unilever', async (req,res) => {
                       const query = {category:'unilever'}
                       const result = await collection.find(query).toArray();
                       res.send(result)
               })
               app.get('/foods', async (req,res) => {
                    const query = {category:'foods'}
                    const result = await collection.find(query).toArray();
                    res.send(result)
            })
            app.get('/others', async (req,res) => {
                   const query = {category:"others"}
                   const result = await collection.find(query).toArray()
                   res.send(result)
            })



          }
          finally {
               // await client.close();
          }
        


     }
     run().catch(console.dir)





});





app.get('/', (req, res) => {
     res.send('server working')
})

app.listen(port, () => {
     console.log(`server ruing ${port}`)
})