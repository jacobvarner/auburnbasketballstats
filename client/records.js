Router.route('/records', {
  title: "All-Time and Season Records | Auburn Basketball Stats",
  subscriptions: function() {
    Meteor.subscribe('records');
  }
});
Session.set('category', "Points");

Template.records.events({
  'change #category-select': function() {
    Session.set('category', $('#category-select').val());
  }
});

Template.records.helpers({
  'categories': function() {
    var categories = RecordInfo.find({}, {fields: {category: 1}}).fetch();
    categories = _.pluck(categories, 'category');
    var uniqueCategories = _.uniq(categories, true);
    return uniqueCategories;
  },
  'career': function() {
    var category = Session.get('category');
    var output = RecordInfo.find({category: category, duration: "Career"}, {sort: {rank: 1}}).fetch();
    return output;
  },
  'season': function() {
    var category = Session.get('category');
    var output = RecordInfo.find({category: category, duration: "Season"}, {sort: {rank: 1}}).fetch();
    return output;
  }
});
