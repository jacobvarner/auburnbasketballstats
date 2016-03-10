Meteor.publish('records', function() {
  return RecordInfo.find();
});
