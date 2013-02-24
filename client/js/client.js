
// Routes & global view template events

// Watch our collections
Meteor.subscribe('posts');
Meteor.subscribe('updates');


Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/posts': 'posts_index',
  '/posts/new': 'posts_new',
  '/posts/:slug': function(params) {
    Session.set('post_slug', params[0]);
    return 'post';
  },
  '/posts/:id/edit': function(params) {
    Session.set('id', params[0]);
    return 'drinks_edit';
  },
});


Template.nav.events({

  'click #home_link': function(){
    return Meteor.Router.to('/');
  },
  'click #about_link': function(){
    return Meteor.Router.to('/about');
  },
  'click #posts_link': function(){
    return Meteor.Router.to('/posts');
  }

});
