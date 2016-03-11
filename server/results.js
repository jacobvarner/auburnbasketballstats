Meteor.publish('resultsTeam', function(team) {
  return SeasonInfo.find({opponent: team});
});

Meteor.publish('resultsGame', function(date, opponent) {
  return GameStats.find({date: date, opponent: opponent});
});

Meteor.publish('gameStats', function() {
  return GameStats.find();
});

Meteor.publish('seasonInfo', function() {
  return SeasonInfo.find();
});

Meteor.publish('resultsPlayer', function(date) {
  return PlayerStats.find({playerDate: date});
});
