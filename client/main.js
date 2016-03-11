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
    if (button.text() == button.data("text-swap")) {
      button.text(button.data("text-original"));
    } else {
      button.data("text-original", button.text());
      button.text(button.data("text-swap"));
    }

    $('.mobile-nav-links').toggle();
  }
});
