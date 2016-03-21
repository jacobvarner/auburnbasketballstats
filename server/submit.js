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
  },
  'addGame': function(season, date, opponent, oppRank, auRank, location, auScore, oppScore, result, ot, conference, confTourney, nit, ncaa) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      SeasonInfo.insert({
        season: season,
        date: date,
        opponent: opponent,
        oppRank: oppRank,
        auRank: auRank,
        location: location,
        auScore: auScore,
        oppScore: oppScore,
        result: result,
        ot: ot,
        conference: conference,
        confTourney: confTourney,
        nit: nit,
        ncaa: ncaa
      });
    }
  }
});
