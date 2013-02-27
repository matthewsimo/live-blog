// Publish complete set of sorted posts to all clients
Meteor.publish('posts', function() {
  return Posts.find({}, {sort: {name: 1}});
});

// Publish all updates for requested post_id
Meteor.publish('updates', function(post_id) {
  return Updates.find({post_id: post_id}, {sort: {creation_time: -1}});
});

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  // Handle inserts on new post items
  'post_insert' : function (options) {
    var date = new Date();

    if (typeof options.title === 'string' && options.title.length !== 0 && 
        typeof options.slug  === 'string' && options.slug.length  !== 0 && 
        options.author) {

      return Posts.insert({
        title: options.title,
        post_slug: options.slug,
        authors: [options.author],
        creation_time: date,
        revision_time: '',
      });

    }
  },
  // Handle updates to post items
  'post_update': function(id, options) {

    var date = new Date();

    return Posts.update({
      _id: id
    }, {
      $set: {
        title: options.title,
        post_slug: options.slug,
        authors: [options.userId],
        revisions_time: date,
      }
    });
  },
  // Handle inserts to new update items
  'update_insert': function (postID, options) {
    var date = new Date();

    if(typeof options.content === 'string' && options.content.length !== 0 &&
       postID !== undefined) {

      return Updates.insert({
        content: options.content,
        post_id: postID,
        author: options.author,
        creation_time: date,
      });
    }

  },
  // Handle updates to update items
  'update_update': function(id, options) {

    return Posts.update({
      _id: id
    }, {
      $set: {
        content: options.content
      }
    });
  },

});

