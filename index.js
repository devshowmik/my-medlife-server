
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const corse = require('cors');
app.use(corse());
app.use(express.json());

const Port = process.env.Port || 5000;
// Check Server port on server console
app.listen(Port, () => {
    console.log('server is running on', Port)
})
// check server is running on cliend side
app.get('/', (req, res) => {
    res.send('Server is runnig')
})

const uri = "mongodb+srv://vector-photography:hTMFqF7N65YXUWRe@users.95k0mgf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        // Create blog collection
        const blogCollection = client.db('vector-photography').collection('blog');
        // Send data to Database
        app.post('/blogs', async (req, res) => {
            const post = req.body;
            const result = await blogCollection.insertOne(post);
            res.send(result);
        })
        // get data from database and send it to client side
        app.get('/blogs', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const blog = await cursor.toArray();
            res.send(blog)

        })
        // update from database
        app.patch('/blogs/:postId', async (req, res) => {
            const id = req.params.postId;
            const query = { _id: ObjectId(id) };
            // get data from client side
            const blog = req.body;
            const updateInfo = {
                $set: {
                    title: blog.title,
                    photo: blog.photo,
                    description: blog.description
                }
            }
            const updatePost = await blogCollection.updateOne(query, updateInfo);
            res.send(updatePost);
        })
        // delete from database
        app.delete('/blogs/:postId', async (req, res) => {
            const id = req.params.postId;
            const query = { _id: ObjectId(id) }
            const deletedPost = await blogCollection.deleteOne(query);
            res.send(deletedPost);
        })
        //get single Blog post
        app.get('/blogs/:postId', async (req, res) => {
            const id = req.params.postId;
            const query = { _id: ObjectId(id) };
            const singlePost = await blogCollection.findOne(query);
            res.send(singlePost);
        })

        // Service API
        const serviceCollection = client.db('vector-photography').collection('services');
        // send data to database
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })
        // send data to client side 
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
        // send single data to client side
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.findOne(query);
            res.send(result)
        })
        // delete data from database
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result)
        })
        //update service 
        app.patch('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = req.body;
            updateService = {
                $set: {
                    title: service.title,
                    price: service.price,
                    photourl: service.photourl,
                    galleryImages: service.galleryImages,
                    description: service.description
                }
            };
            const result = await serviceCollection.updateOne(query, updateService);
            res.send(result)
        })
        // review
        const reviewCollection = client.db('vector-photography').collection('reviews');
        // send review to database
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result)
        })
        // send review to client side
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // send review to client side
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { postId: id };
            const filter = await reviewCollection.find(query).toArray();
            res.send(filter)
        })
        //delete reviews
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);

        })
        //cart items
        const cartCollection = client.db('vector-photography').collection('cart');
        // send data to data base
        app.post('/cart', async (req, res) => {
            const cart = req.body;
            const result = await cartCollection.insertOne(cart);
            res.send(result)
        })
        //send data to client side
        app.get('/cart', async (req, res) => {
            const query = {};
            const cursor = cartCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // delete cart data
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));