
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
// database
//user : vector-photography
// password : hTMFqF7N65YXUWRe


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
            const query = { _id: ObjectId(id) }
            const singlePost = await blogCollection.findOne(query);
            res.send(singlePost);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));