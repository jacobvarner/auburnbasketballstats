Meteor.publish('roster', function() {
  return RosterInfo.find();
});

Meteor.publish('records', function() {
  return RecordInfo.find();
});

Meteor.publish('season', function() {
  return SeasonInfo.find();
});
