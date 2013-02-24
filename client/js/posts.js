Template.posts.posts = function(){
  var allPosts = Posts.find({}, {sort: {name: 1}})
  if (allPosts.count() > 0)
    return allPosts;
  else
    return false; 
};


Template.posts_new.events({
  'click #post-submit': function(e){
    e.preventDefault();
    var $title = $('#new-post input#post-title'),
        $content = $('#new-post textarea'),
        errors;

    if(!$title.attr('value')) {
      $title.addClass('error');
    }

    if(!$content.attr('value')) {
      $content.addClass('error');
    }
    
      
  },

  'focus #new-post .error': function(e){
    $(e.srcElement).removeClass('error');
  }

});
