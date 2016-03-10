Meteor.publish('roster', function() {
  return PlayerInfo.find();
});
