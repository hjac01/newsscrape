const express = require ("express")
const axios = require ("axios")
const cheerio = require ("cheerio")
const mongoose = require ("mongoose")
const PORT = 8080
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongodburi = "mongodb://localhost/newsscrape"
mongoose.connect(mongodburi)
const Post = require ("./models/post")
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


app.listen(
    PORT, () => {
        console.log("App is listening on 8080")
    }
)
