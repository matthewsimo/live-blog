Template.posts.posts = function(){
  var allPosts = Posts.find({}, {sort: {name: 1}})
  if (allPosts.count() > 0)
    return allPosts;
  else
    return false; 
};


Template.posts_new.events({
  'submit #new-post': function(e){
    var $title = $('#new-post input#post-title'),
        $content = $('#new-post textarea'),
        title = $title.attr('value'),
        content = $content.attr('value'),
        userId = Meteor.user().emails[0].address,
        errors = [];

    if(!userId) {
      errors.push("You must be logged in, trickster");
    }

    if(!title) {
      $title.addClass('error');
      errors.push("The Title is required");
    }

    if(!content) {
      $content.addClass('error');
      errors.push("The Post Content is required");
    }
    
    if(errors.length > 0){
      console.log(errors);
      return false;
    } else {
      // Make a nice slug based on title
      var slug = title.toLowerCase().replace(/[\s_]/g, '-').replace(/[^-a-zA-Z0-9]/g, '');

      Meteor.call('createNewPost', {
        title: title, 
        slug: slug,
        authors: userId
      });
    }

    e.preventDefault();
  },

  'focus #new-post .error': function(e){
    $(e.srcElement).removeClass('error');
  }

});
