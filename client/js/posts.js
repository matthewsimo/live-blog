Meteor.startup(function() {

  Session.setDefault('post_slug', false);
  Session.setDefault('isAuthor', false);

});


Template.posts.posts = function(){
  var allPosts = Posts.find({}, {sort: {name: 1}})
  if (allPosts.count() > 0)
    return allPosts;
  else
    return false; 
};


Template.posts_new.events({
  'submit #new-post': function(e){

    e.preventDefault();

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

      Meteor.call('post_insert', 
        { title: title, slug: slug, author: userId}, 
        function(err, data) {
          if(err) 
            console.log(err);

          console.log("Post insert data: " + data);

          // We've added a new post, let's add the content now.
          Meteor.call('update_insert',
            data,
            { content: content, author: userId},
            function(err, data) {
              if(err) 
                console.log(err);

              console.log("Update insert data: " + data);
            }
          );
          Meteor.Router.to('/posts/' + slug);
        }
      );


    }

  },

  'focus #new-post .error': function(e){
    $(e.srcElement).removeClass('error');
  }

});


Template.post.post = function() {
  var post = Session.get('post_slug');
  post = Posts.findOne({post_slug: post});
  return post;
};


