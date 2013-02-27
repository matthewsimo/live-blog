
Template.updates.updates = function() {
  var slug = Session.get('post_slug');
  var post = Session.get('post');
  post = Posts.findOne({post_slug: slug});
  if(post){
    var updates = Updates.find();
    return updates;
  }
};
