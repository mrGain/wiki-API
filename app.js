const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const res = require('express/lib/response');

const app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

// Database setup goes here 
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true});

//Database Schema
const ArticleSchema = {
    title: String,
    content: String
}
// Database models goes here
const Article = mongoose.model('Article',ArticleSchema);

app.get("/articles",function(request,response){
    Article.find(function(err,foundArticles){
        if(!err){
            response.send(foundArticles)

        }else{
            response.send(err)
        }
    });
});

app.post("/articles",function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);
});

app.listen(3000,function(){
    console.log("Server started on port 3000")
})