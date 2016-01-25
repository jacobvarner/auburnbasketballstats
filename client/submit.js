Router.route('/submit');

Template.statsInput.events({
  'submit form': function(event){
    event.preventDefault();
  }
});
