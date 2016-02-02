Router.route('/roster');

Session.set('season', "2015-2016") //UPDATE AFTER EACH SEASON

Template.roster.helpers({
  'seasonList': function() {
    var seasons = PlayerInfo.find({}, {sort: {season: -1}, fields: {season: 1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  },
  'getRoster': function() {
    var season = Session.get('season');
    var roster = PlayerInfo.find({season: season}, {sort: {number: 1}}).fetch();
    return roster;
  },
  'link': function() {
    var nameString = this.name;
    var nameLink = nameString.replace(" ", "+");
    var output = "/player/" + nameLink;
    return output;
  }
});

Template.roster.events({
  "change #season-select": function() {
    Session.set('season', $('#season-select').val());
  }
});