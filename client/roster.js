Router.route('/rosters', {
  name: 'roster',
  template: 'roster',
  data: function() {
    var season = PlayerInfo.find({}, {field: {season: 1}, sort: {season: -1}}).fetch();
    season = _.pluck(season, 'season');
    season = season[0];
    Session.set('rosterSeason', season);
  }
});

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
    var season = Session.get('rosterSeason');
    var nameLink = season + "/" + nameString.replace(" ", "+");
    var output = "/player/" + nameLink;
    return output;
  },
  'playerInfo': function() {
    if (this.transfer === true || this.scholarship === true) {
      if (this.transfer === true) {
        var transfer = "T";
      } else {
        var transfer = "";
      }

      if (this.scholarship === true) {
        var scholarship = "S";
      } else {
        var scholarship = "";
      }

      if (this.transfer === true && this.scholarship === true) {
        var comma = ", ";
      } else {
        var comma = "";
      }

      var output = "[" + transfer + comma + scholarship + "]";
    } else {
      var output = "";
    }
    return output;
  },
  'hasStats': function() {
    var name = this.name;
    var season = Session.get('rosterSeason');
    var value = PlayerStats.find({playerName: name, playerSeason: season}).count();
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
