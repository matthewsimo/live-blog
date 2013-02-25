// Publish complete set of sorted posts to all clients
Meteor.publish('posts', function() {
  return Posts.find({}, {sort: {name: 1}});
});

// Publish all updates for requested post_id
Meteor.publish('updates', function(post_id) {
  return Updates.find({post_id: post_id}, {sort: {creation_time: 1}});
});

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  'createNewPost' : function (options) {
    var date = new Date();

    if (typeof options.title === 'string' && options.title.length !== 0 && 
        typeof options.slug  === 'string' && options.slug.length  !== 0 && 
        options.userId) {

      postID = Posts.insert({
        title: options.title,
        post_slug: options.slug,
        authors: [options.userId],
        creation_time: date,
        revision_time: '',
      });

      updateID = Updates.insert({
        content: options.content,
        post_id: postId,
        author: options.userId,
        creation_time: date,
      });

      return {postid: postID, updateid: updateID};
    }
  },
});

