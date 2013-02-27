

// Routes & global view template events

// Watch our collections
Meteor.subscribe('posts');
Meteor.subscribe('updates', Session.get('post_id'));


Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/posts': 'posts_index',
  '/posts/new': 'posts_new',
  '/posts/:slug': function(params) {

    Session.set('post_slug', params);
    var p = Posts.findOne({post_slug: params});
    if(p) {
      Session.set('post', p);
      Session.set('post_id', p._id);
    }
    return 'post';
  },
  '/posts/:slug/edit': function(params) {
    Session.set('post_slug', params);
    Session.set('post', Posts.findOne({post_slug: params}));
    return 'post_edit';
  },
});


Template.nav.events({

  'click #home_link, touchup #home_link': function(){
    return Meteor.Router.to('/');
  },
  'click #about_link, touchup #about_link': function(){
    return Meteor.Router.to('/about');
  },
  'click #posts_link, touchup #posts_link': function(){
    return Meteor.Router.to('/posts');
  }

});

