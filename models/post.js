
var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var postSchema = new Schema({
 
  title: {
    type: String,
    trim: true,
  },

  link: {
    type: String,
    trim: true,
  },

  saved: {
    type: Boolean, 
    default: false, 

  }

  

});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
