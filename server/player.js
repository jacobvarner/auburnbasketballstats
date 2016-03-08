Meteor.publish('playerStats', function() {
  return PlayerStats.find({}, {fields: {playerSeason: 1}, {playerName: 1}});
});

Meteor.publish('singlePlayer', function(name, season) {
  return PlayerStats.find({ playerName: name, playerSeason: season });
});
