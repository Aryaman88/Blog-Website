

const express = require("express");
const _=require("lodash")

const ejs = require("ejs");

const homeStartingContent = "Add anything you like";
const aboutContent = "I am a Web Developer and Tech enthusiast";
const contactContent = "singharyaman619@gmail.com";

const app = express();
app.use(express.urlencoded())

app.set('view engine', 'ejs');

app.use(express.static("public"));

let posts=[]


app.get("/",function(req,res){
  res.render("home.ejs",{home:homeStartingContent,posts:posts})
  
 
})
app.get("/about",function(req,res){
  res.render("about.ejs",{about:aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact.ejs",{contact:contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose.ejs")
})

app.post("/compose",function(req,res){
  const post={
   title:req.body.posttitle,
    content:req.body.postBody
  } 
  posts.push(post)
  res.redirect("/")
})







app.get("/posts/:postname",function(req,res){
  const reqtitle=_.lowerCase(req.params.postname)
  
  
  posts.forEach(function(post){
    if(_.lowerCase(post.title)==reqtitle){

      res.render("post.ejs",{posttitle:post.title,postbody:post.content})
    }
  })
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
