Router.route('/roster');

Template.roster.helpers({
  'seasonList': function() {
    var seasons = PlayerInfo.find({}, {sort: {season: -1}, fields: {season: 1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  }
});
