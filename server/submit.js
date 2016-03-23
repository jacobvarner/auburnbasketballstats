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
  },
  'addGameStats': function(season, opponent, date, location, attendance, auburnFGM, auburnFGA, auburn3PM, auburn3PA, auburn2PM, auburn2PA, auburnFTM, auburnFTA, auburnORB, auburnDRB, auburnREB, auburnPoints, auburnAST, auburnTO, auburnBLK, auburnSTL, auburnPF, auburnMIN, auburnPOT, auburnPIP, auburn2CP, auburnFBP, auburnBP, opponentFGM, opponentFGA, opponent3PM, opponent3PA, opponent2PM, opponent2PA, opponentFTM, opponentFTA, opponentORB, opponentDRB, opponentREB, opponentPoints, opponentAST, opponentTO, opponentBLK, opponentSTL, opponentPF, opponentMIN, opponentPOT, opponentPIP, opponent2CP, opponentFBP, opponentBP) {
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4") {
      GameStats.insert({
        season: season,
        opponent: opponent,
        date: date,
        location: location,
        attendance: attendance,
        auburnFGM: auburnFGM,
        auburnFGA: auburnFGA,
        auburn3PM: auburn3PM,
        auburn3PA: auburn3PA,
        auburn2PM: auburn2PM,
        auburn2PA: auburn2PA,
        auburnFTM: auburnFTM,
        auburnFTA: auburnFTA,
        auburnORB: auburnORB,
        auburnDRB: auburnDRB,
        auburnREB: auburnREB,
        auburnPoints: auburnPoints,
        auburnAST: auburnAST,
        auburnTO: auburnTO,
        auburnBLK: auburnBLK,
        auburnSTL: auburnSTL,
        auburnPF: auburnPF,
        auburnMIN: auburnMIN,
        auburnPOT: auburnPOT,
        auburnPIP: auburnPIP,
        auburn2CP: auburn2CP,
        auburnFBP: auburnFBP,
        auburnBP: auburnBP,
        opponentFGM: opponentFGM,
        opponentFGA: opponentFGA,
        opponent3PM: opponent3PM,
        opponent3PA: opponent3PA,
        opponent2PM: opponent2PM,
        opponent2PA: opponent2PA,
        opponentFTM: opponentFTM,
        opponentFTA: opponentFTA,
        opponentORB: opponentORB,
        opponentDRB: opponentDRB,
        opponentREB: opponentREB,
        opponentPoints: opponentPoints,
        opponentAST: opponentAST,
        opponentTO: opponentTO,
        opponentBLK: opponentBLK,
        opponentSTL: opponentSTL,
        opponentPF: opponentPF,
        opponentMIN: opponentMIN,
        opponentPOT: opponentPOT,
        opponentPIP: opponentPIP,
        opponent2CP: opponent2CP,
        opponentFBP: opponentFBP,
        opponentBP: opponentBP
      });
    }
  }
});
