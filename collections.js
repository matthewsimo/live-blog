/*

This defines the collections used for the app.

There will be a Posts collection, which will hold all of the posts...
  A Post will have by default:
    title: String,
    post_slug: String,
    creation_time: Number,
    revision_time: Number,
    authors: [String, ...]


There will also be an Updates collection, which will hold all of the updates across all posts...
  An update will have by default:
    content: String,
    post_id: String,
    author: String,
    creation_time: Number,

*/


Posts = new Meteor.Collection("posts");

Posts.allow({
  insert: function() {
    return false;
  },
  update: function(userId, post) {
    if (userId && _.indexOf(post.autors, userId) !== -1)
      return true;
  },
  remove: function() {
    if (userId && _.indexOf(post.autors, userId) !== -1)
      return true;
  }
});

Updates = new Meteor.Collection("updates");

Updates.allow({
  insert: function() {
    return false;
  },
  update: function(){
    return false;
  },
  remove: function() {
    return false;
  }
});

