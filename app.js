

const express = require("express");
const _=require("lodash")
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Admin_Aryaman:aryaman887@cluster0.iodkq.mongodb.net/blogDB", {useNewUrlParser: true});

const ejs = require("ejs");

const homeStartingContent = "Add anything you like";
const aboutContent = "I am a Web Developer and Tech enthusiast";
const contactContent = "singharyaman619@gmail.com";

const app = express();
app.use(express.urlencoded())

app.set('view engine', 'ejs');

app.use(express.static("public"));



const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      home: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:post", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {about: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});