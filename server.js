const express = require ("express")
const axios = require ("axios")
const cheerio = require ("cheerio")
const mongoose = require ("mongoose")
// const PORT = 8080
const app = express()

var port = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var databaseUrl = "newsscrape";
var collections = ["posts"];


const mongodburi = "mongodb://localhost/newsscrape"
mongoose.connect(mongodburi)

var uri = process.env.MONGOLAB_URI;

const Post = require ("./models/post")

function scrape() {
  axios.get("https://old.reddit.com/r/webdev/").then((response) => {
  const $ = cheerio.load(response.data);
  $("p.title").each((i, element) => {
    const title = $(element).text();
    const link = $(element).children().attr("href");

const post = {
    title: title,
    link: link
}
const newPost = new Post (post)
newPost.save ((err)=>{
    if (err)
    console.log("error")
}) 
   
  });

});
}

app.get("/api/scrape",() => {
    axios.get("https://old.reddit.com/r/webdev/").then((response) => {
  const $ = cheerio.load(response.data);
  $("p.title").each((i, element) => {
    const title = $(element).text();
    const link = $(element).children().attr("href");

const post = {
    title: title,
    link: link
}
const newPost = new Post (post)
newPost.save ((err)=>{
    if (err)
    console.log("error")
}) 
   
  });

});
})


app.get("/api/posts",(req, res)=>{
    Post.find({},(err, data)=>{
        if (err)
        console.log("error")
        res.json(data)
    })
})

app.get("/api/posts/saved",(req, res)=>{
  Post.find({saved:true},(err, data)=>{
      if (err)
      console.log("error")
      res.json(data)
  })
})

// saved articles
app.post("/api/posts/saved", (req, res) => {
  res.sendFile(path.join(_dirname + ".public/saved.html"));
  db.post.insert({saved:true}, function(err, data) {
    if (error) {
      console.log(error);
    }
    else {
      res.send(data);
    }

  })
})

app.post("/api/posts",(req, res) => {
  console.log(req.body)
  Post.findByIdAndUpdate(req.body.id, { $set: {
    saved: true
  }},(err,data)=> {
    if (err) {
    console.log("error")
    }
    console.log("success")
    

  })
})

app.post("/", function(req, res){
    res.sendFile(path.join(_dirname + "./public/index.html"));
    console.log(req.body);
    db.post.insert(req.body, function(error, data){
        if (error) {
            console.log(error);
          }
          else {
            res.send(data);
          }
        });
    })


// Clear the DB
app.get("/", function(req, res) {
  db.post.remove(req.body, function(error, data) {
    if (error) {
      console.log(error);
    
    }
    else {
      res.send(data);
    }
  });
});


// app.listen(
//     PORT, () => {
//         console.log("App is listening on 8080")
//     }
// )

var server=app.listen(port,function() {
  console.log("app running on port 8080"); });
