const express = require('express')
const MongoClient = require('mongodb').MongoClient


const app = express() 
const cors = require('cors');
app.use(cors())

app.use(express.json())

global.bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))



var database
var databaseBlog
var databaseCategories

app.get('/', (req,res) => {
    res.send("hihi")
})
app.get('/api/artists', (req, res) => {
    database.collection('artists').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})
app.get('/api/music/vietnamese', (req, res) => {
    database.collection('vietnamese').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get(`/api/categories`, (req, res) => {
    databaseCategories.collection('category').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get("/api/blog", (req, res) => {
    databaseBlog.collection('blog').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})
app.post("/api/blog", (req, res) => {
    databaseBlog.collection('blog').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})
var databaseBlogPost
app.post('/api/blogPost', (req, res) => {
    console.log(req.body);
    databaseBlogPost.collection('blog').insertOne(req.body, (err, data) => {
        if(err) return console.log(err);
        res.send(('saved to db: ' + data));
    })
});
// Post user
var databaseUser
app.get('/api/user', (req, res) => {
    databaseUser.collection('user').find({}).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})
app.post('/api/user-post',(req, res) => {
    databaseUser.collection('user').insertOne(req.body, (err, data) => {
        if(err) return console.log(err);
        res.send(('saved to db: ' + data));
    })
})
app.post('/api/user/:id/edit',(req, res) => {
    databaseUser.collection('user').findById(req.body.id, (err, data) => {
        if(err) return console.log(err);
        res.send(('saved to db: ' + data));
        console.log(req.body.id);
    })
})
console.log(databaseBlogPost);
app.listen(8080, () => {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (error, result)=> {
        if(error) throw error 
        database = result.db('music-website')
        databaseUser = result.db('blog-user')
        databaseBlog = result.db('blog-image')
        databaseBlogPost = result.db('blog-image')
        databaseCategories = result.db('categories')
    })
})
console.log(database);