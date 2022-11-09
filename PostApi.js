const PostApi = () => {
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
}