Router.route('/roster');

Session.set('rosterSeason', "2015-2016") //UPDATE AFTER EACH SEASON

Template.roster.helpers({
  'seasonList': function() {
    var seasons = PlayerInfo.find({}, {sort: {season: -1}, fields: {season: 1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  },
  'getRoster': function() {
    var season = Session.get('rosterSeason');
    var roster = PlayerInfo.find({season: season}, {sort: {number: 1}}).fetch();
    return roster;
  },
  'link': function() {
    var nameString = this.name;
    var nameLink = nameString.replace(" ", "+");
    var output = "/player/" + nameLink;
    return output;
  },
  'hasStats': function() {
    var name = this.name;
    var value = PlayerStats.find({playerName: name}).count();
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  }
});

Template.roster.events({
  "change #season-select": function() {
    Session.set('rosterSeason', $('#season-select').val());
  }
});
