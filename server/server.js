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
