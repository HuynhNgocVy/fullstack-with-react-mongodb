// // Load express module
// const express = require('express');

// // Initialize app
// const app = express();

// // Mongoose connection
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/music-website');
// const db = mongoose.connection;

// // Check for DB connection
// db.once('open', function(){
//     console.log("Connected to MongoDB successfully!");
// });
// db.on('error', function(){
//     console.log(err);
// });

// // Route for home

// // To connect with your mongoDB database
// use nodemongo
// db.createCollection('posts')
// db.posts.insert({title: "First Post", slug: "first-post", author: "salitha", description: "This is the post 1 description"})
// db.posts.insert({title: "Second Post", slug: "second-post", author: "salitha", description: "This is the post 2 description"})
// db.posts.insert({title: "Third Post", slug: "third-post", author: "salitha", description: "This is the post 3 description"})
// db.posts.find().pretty()
// // Schema for users of app
// const MusicSchema = new mongoose.Schema({
//     singer: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     }
// });
// const Music = mongoose.model('musics', MusicSchema);
// Music.createIndexes();

// // For backend and express

// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {

//     resp.send("App is Working");
//     // You can check backend is working or not by 
//     // entering http://loacalhost:5000
    
//     // If you see App is working means
//     // backend working properly
// });
// app.get('/music', function (req, res) {
//     let music = Music.find({}, function(err, music){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(music);
//         }
//     });
// });
// // app.get("/music", async (req, resp) => {
// //     try {
// //         const music = new Music(req.body);
// //         let result = await music.save();
// //         result = result.toObject();
// //         console.log(result);
// //         if (result) {
// //             // delete result.password;
// //             // resp.send(req.body);
// //             console.log(result);
// //         } else {
// //             console.log("User already register");
// //         }

// //     } catch (e) {
// //         resp.send("Something Went Wrong");
// //     }
// // });
// app.listen(5000);
const obj = {
    name: ""
}