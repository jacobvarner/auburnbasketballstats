Router.route('/', {
  name: 'home',
  template: 'home',
  title: "Home | Auburn Basketball Stats"
});

Router.configure({
  layoutTemplate: 'main'
});

Template.navigation.events({
  'click #menu-button': function() {
    var button = $('#menu-button')

    $('.mobile-nav-links').toggle();
  }
});
