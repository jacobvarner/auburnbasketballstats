Meteor.publish('roster', function() {
  return RosterInfo.find();
});

Meteor.publish('records', function() {
  return RecordInfo.find();
});

Meteor.publish('season', function() {
  return SeasonInfo.find();
});

Meteor.methods({
  'addPlayer': function(season, name, number, position, height, weight, class, scholarship, transfer, hometown, lastSchool) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      PlayerInfo.insert({
        season: season,
        name: name,
        number: number,
        position: position,
        height: height,
        weight: weight,
        class: class,
        scholarship: scholarship,
        transfer: transfer,
        hometown: hometown,
        lastSchool: lastSchool
      });
    }
  },
  'deletePlayer': function(id) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      PlayerInfo.remove({ _id: id });
    }
  },
  'addRecord': function(category, duration, rank, player, season, value) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      RecordInfo.insert({
        category: category,
        duration: duration,
        rank: rank,
        player: player,
        season: season,
        value: value
      });
    }
  },
  'deleteRecord': function(id) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      RecordInfo.remove({ _id: id });
    }
  }
});
