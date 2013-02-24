Template.posts.posts = function(){
  var allPosts = Posts.find({}, {sort: {name: 1}})
  if (allPosts.count() > 0)
    return allPosts;
  else
    return false; 
};
