const mongoose = require('mongoose');
const uuid = require('uuid');

// schema to represent a blog post
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: { type: String, required: true },
  // the `author` property is an object
  author: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  created: { type: Date, required: false },
  id: { type: Number, required: false }
});

postSchema.virtual('authorFullName').get(function () {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});

postSchema.methods.serialize = function () {

  return {
    title: this.title,
    content: this.content,
    author: this.authorFullName,
    created: Date.now(),
    id: uuid.v4()
  };
}

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };