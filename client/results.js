Router.route('/results', {
  name: 'results',
  template: 'results',
  subscriptions: function() {
    Meteor.subscribe('gameStats');
    Meteor.subscribe('seasonInfo');
  },
  data: function() {
    var season = SeasonInfo.find({}, {field: {season: 1}, sort: {season: -1}}).fetch();
    season = _.pluck(season, 'season');
    season = season[0];
    if (!Session.get('resultsSeason')) {
      Session.set('resultsSeason', season);
    }
  }
});

Router.route('/results/:date/:opponent', {
  name: "resultsGame",
  template: "resultsGame",
  subscriptions: function() {
    var dateString = this.params.date;
    var dateArray = dateString.split("-");
    var month = dateArray[0];
    if (month.length === 1) {
      month = "0" + month;
    }
    var day = dateArray[1];
    var year = dateArray[2];
    var date = new Date(year + "-" + month + "-" + day);
    var opponent = this.params.opponent.replace("+", " ");
    Meteor.subscribe('resultsGame', date, opponent);
  },
  data: function() {
    var dateString = this.params.date;
    var dateArray = dateString.split("-");
    var month = dateArray[0];
    if (month.length === 1) {
      month = "0" + month;
    }
    var day = dateArray[1];
    var year = dateArray[2];
    var date = new Date(year + "-" + month + "-" + day);
    var opponent = this.params.opponent.replace("+", " ");
    Session.set('opponent', opponent);
    Session.set('date', date);
    var gameResults = GameStats.find({date: date, opponent: opponent}).fetch();
    return gameResults;
  }
});

Router.route('/results/:team', {
  name: "resultsTeam",
  template: "resultsTeam",
  subscriptions: function() {
    var team = this.params.team.replace("+", " ");
    Meteor.subscribe('resultsTeam', team);
  },
  data: function() {
    var teamLink = this.params.team;
    var teamString = teamLink.replace("+", " ");
    Session.set('team', teamString);
    var teamResults = SeasonInfo.find({opponent: teamString}).fetch();
    return teamResults;
  }
});

Template.results.events({
  'change #season-select': function() {
    Session.set('resultsSeason', $('#season-select').val());
  },
  'change #team-select': function() {
    var team = $('#team-select').val();
    var link = team.replace(" ", "+");
    Router.go('/results/' + link);
  }
});

Template.results.helpers({
  'seasonList': function() {
    var seasons = SeasonInfo.find({}, {sort: {season: -1}, fields: {season: 1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  },
  'teamList': function() {
    var teams = SeasonInfo.find({}, {sort: {opponent: 1}, fields: {opponent: 1}}).fetch();
    teams = _.pluck(teams, 'opponent');
    var uniqueTeams = _.uniq(teams, true);
    return uniqueTeams;
  },
  'display': function(){
    var season = Session.get('resultsSeason');
    var output = SeasonInfo.find({ season: season }, {sort: {date: 1}}).fetch();
    return output;
  },
  'season': function() {
    return Session.get('resultsSeason');
  },
  'getDate': function() {
    var d = this.date;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var output = month + "/" + day + "/" + year;
    return output;
  },
  'resultRow': function() {
    if (this.result === "W") {
      return 'class="win"';
    } else if (this.result === "L") {
      return 'class="loss"';
    } else {
      return '';
    }
  },
  'home': function() {
    if (this.location === "Away") {
      var team = this.opponent;
      if (this.oppRank > 0) {
        var rank = "(" + this.oppRank + ")"
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    } else {
      var team = "Auburn";
      if (this.auRank > 0) {
        var rank = "(" + this.auRank + ")";
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    }
    return output;
  },
  'away': function() {
    if (this.location === "Away") {
      var team = "Auburn";
      if (this.auRank > 0) {
        var rank = "(" + this.auRank + ")"
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    } else {
      var team = this.opponent;
      if (this.oppRank > 0) {
        var rank = "(" + this.oppRank + ")";
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    }
    return output;
  },
  'overtime': function() {
    if (this.ot > 0) {
      var output = "(" + this.ot + "OT)";
    } else {
      var output = "";
    }
    return output;
  },
  'conference': function() {
    if (this.conference === true) {
      return true;
    } else {
      return false;
    }
  },
  'confTourney': function() {
    if (this.confTourney === true) {
      return true;
    } else {
      return false;
    }
  },
  'nit': function() {
    if (this.nit === true) {
      return true;
    } else {
      return false;
    }
  },
  'ncaa': function() {
    if (this.ncaa === true) {
      return true;
    } else {
      return false;
    }
  },
  'hasGameStats': function() {
    var d = this.date;
    var month = (d.getUTCMonth() + 1).toString();
    var day = d.getUTCDate().toString();
    var year = d.getUTCFullYear().toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    var date = new Date(year + "-" + month + "-" + day);
    var opponent = this.opponent;
    if (GameStats.find({date: date, opponent: opponent}).count() === 1) {
      return true;
    } else {
      return false;
    }
  },
  'link': function() {
    var d = this.date;
    var month = parseInt(d.getUTCMonth() + 1);
    var day = parseInt(d.getUTCDate());
    var year = parseInt(d.getUTCFullYear());
    var date = new Date(year + "-" + month + "-" + day);
    var opponent = this.opponent;
    var link = month + "-" + day + "-" + year + "/" + opponent.replace(" ", "+");
    return link;
  },
  'getRecord': function() {
    var season = Session.get('resultsSeason');
    var wins = SeasonInfo.find({season: season, result: "W"}).count();
    var losses = SeasonInfo.find({season: season, result: "L"}).count();
    var ties = SeasonInfo.find({season: season, result: "T"}).count();
    var confWins = SeasonInfo.find({season: season, result: "W", conference: true}).count();
    var confLosses = SeasonInfo.find({season: season, result: "L", conference: true}).count();
    var confTies = SeasonInfo.find({season: season, result: "T", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getHomeRecord': function() {
    var season = Session.get('resultsSeason');
    var wins = SeasonInfo.find({season: season, result: "W", location: "Home"}).count();
    var losses = SeasonInfo.find({season: season, result: "L", location: "Home"}).count();
    var ties = SeasonInfo.find({season: season, result: "T", location: "Home"}).count();
    var confWins = SeasonInfo.find({season: season, result: "W", location: "Home", conference: true}).count();
    var confLosses = SeasonInfo.find({season: season, result: "L", location: "Home", conference: true}).count();
    var confTies = SeasonInfo.find({season: season, result: "T", location: "Home", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getAwayRecord': function() {
    var season = Session.get('resultsSeason');
    var wins = SeasonInfo.find({season: season, result: "W", location: "Away"}).count();
    var losses = SeasonInfo.find({season: season, result: "L", location: "Away"}).count();
    var ties = SeasonInfo.find({season: season, result: "T", location: "Away"}).count();
    var confWins = SeasonInfo.find({season: season, result: "W", location: "Away", conference: true}).count();
    var confLosses = SeasonInfo.find({season: season, result: "L", location: "Away", conference: true}).count();
    var confTies = SeasonInfo.find({season: season, result: "T", location: "Away", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getNeutralRecord': function() {
    var season = Session.get('resultsSeason');
    var wins = SeasonInfo.find({season: season, result: "W", location: "Neutral"}).count();
    var losses = SeasonInfo.find({season: season, result: "L", location: "Neutral"}).count();
    var ties = SeasonInfo.find({season: season, result: "T", location: "Neutral"}).count();
    var confWins = SeasonInfo.find({season: season, result: "W", location: "Neutral", conference: true}).count();
    var confLosses = SeasonInfo.find({season: season, result: "L", location: "Neutral", conference: true}).count();
    var confTies = SeasonInfo.find({season: season, result: "T", location: "Neutral", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W"}).count();
    var losses = SeasonInfo.find({result: "L"}).count();
    var ties = SeasonInfo.find({result: "T"}).count();
    var confWins = SeasonInfo.find({result: "W", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getHomeRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Home"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Home"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Home"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Home", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Home", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Home", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getAwayRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Away"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Away"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Away"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Away", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Away", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Away", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  },
  'getNeutralRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Neutral"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Neutral"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Neutral"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Neutral", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Neutral", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Neutral", conference: true}).count();
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ")";
  }
});

Template.resultsTeam.helpers({
  'teamName': function() {
    var team = Session.get('team');
    return team;
  },
  'seasonList': function() {
    var seasons = SeasonInfo.find({}, {sort: {season: -1}, fields: {season: 1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  },
  'teamList': function() {
    var teams = SeasonInfo.find({}, {sort: {opponent: 1}, fields: {opponent: 1}}).fetch();
    teams = _.pluck(teams, 'opponent');
    var uniqueTeams = _.uniq(teams, true);
    return uniqueTeams;
  },
  'display': function(){
    var team = Session.get('team');
    var output = SeasonInfo.find({ opponent: team }, {sort: {date: -1}}).fetch();
    return output;
  },
  'getDate': function() {
    var d = this.date;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var output = month + "/" + day + "/" + year;
    return output;
  },
  'home': function() {
    if (this.location === "Away") {
      var team = this.opponent;
      if (this.oppRank > 0) {
        var rank = "(" + this.oppRank + ")"
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    } else {
      var team = "Auburn";
      if (this.auRank > 0) {
        var rank = "(" + this.auRank + ")";
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    }
    return output;
  },
  'away': function() {
    if (this.location === "Away") {
      var team = "Auburn";
      if (this.auRank > 0) {
        var rank = "(" + this.auRank + ")"
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    } else {
      var team = this.opponent;
      if (this.oppRank > 0) {
        var rank = "(" + this.oppRank + ")";
      } else {
        var rank = "";
      }
      var output = team + " " + rank;
    }
    return output;
  },
  'overtime': function() {
    if (this.ot > 0) {
      var output = "(" + this.ot + "OT)";
    } else {
      var output = "";
    }
    return output;
  },
  'conference': function() {
    if (this.conference === true) {
      return true;
    } else {
      return false;
    }
  },
  'confTourney': function() {
    if (this.confTourney === true) {
      return true;
    } else {
      return false;
    }
  },
  'nit': function() {
    if (this.nit === true) {
      return true;
    } else {
      return false;
    }
  },
  'ncaa': function() {
    if (this.ncaa === true) {
      return true;
    } else {
      return false;
    }
  },
  'conferenceTeam': function() {
    var team = Session.get('team');
    if (team === "Alabama" || team === "Ole Miss" || team === "LSU" || team === "Georgia" || team === "Florida" || team === "Texas A&M" || team === "Arkansas" || team === "Mississippi State" || team === "Tennessee" || team === "Missouri" || team === "South Carolina" || team === "Kentucky" || team === "Vanderbilt") {
      return true;
    } else {
      return false;
    }
  },
  'currentStreak': function() {
    var team = Session.get('team');
    var results = SeasonInfo.find({opponent: team}, {sort: {date: -1}}).fetch();
    if (results[0].result === "W") {
      var winner = "Auburn";
      var count = 1;
      for (i = 1; i < results.length; i++) {
        if (results[i].result === "W") {
          count++;
        }
        else {
          break;
        }
      }
      return winner + ", " + count
    } else if (results[0].result === "L") {
      var winner = "Opponent";
      var count = 1;
      for (i = 1; i < results.length; i++) {
        if (results[i].result === "L") {
          count++;
        }
        else {
          break;
        }
      }
      return winner + ", " + count
    } else {
      return "None, last game was a tie."
    }
  },
  'allTimeRecord': function() {
    var team = Session.get('team');
    var wins = SeasonInfo.find({opponent: team, result: "W"}).count();
    var losses = SeasonInfo.find({opponent: team, result: "L"}).count();
    var ties = SeasonInfo.find({opponent: team, result: "T"}).count();
    return wins + "-" + losses + "-" + ties;
  },
  'lastMatchup': function() {
    var team = Session.get('team');
    var results = SeasonInfo.find({opponent: team}, {sort: {date: -1}}).fetch();
    var d = results[0].date;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var output = month + "/" + day + "/" + year;
    return output;
  }
});

Template.resultsTeam.events({
  'change #team-select': function() {
    var team = $('#team-select').val();
    var link = team.replace(" ", "+");
    Router.go('/results/' + link);
  },
  'change #season-select': function() {
    Session.set('resultsSeason', $('#season-select').val());
    Router.go('/results')
  }
});

Template.resultsGame.helpers({
  'heading': function() {
    var opponent = this[0].opponent;
    var d = this[0].date;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var date = month + "/" + day + "/" + year;
    var location = this[0].location;
    if (location === "away") {
      var locationString = "at";
    } else {
      var locationString = "vs";
    }
    return "Auburn " + locationString + " " + opponent + " (" + date + ")";
  },
  'attendance': function() {
    return this[0].attendance;
  },
  'opponent': function() {
    return this[0].opponent;
  },
  'auburnPoints': function() {
    return this[0].auburnPoints;
  },
  'opponentPoints': function() {
    return this[0].opponentPoints;
  },
  'pointsDiff': function() {
    var diff = this[0].auburnPoints - this[0].opponentPoints;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFGM': function() {
    return this[0].auburnFGM;
  },
  'opponentFGM': function() {
    return this[0].opponentFGM;
  },
  'fgmDiff': function() {
    var diff = this[0].auburnFGM - this[0].opponentFGM;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFGA': function() {
    return this[0].auburnFGA;
  },
  'opponentFGA': function() {
    return this[0].opponentFGA;
  },
  'fgaDiff': function() {
    var diff = this[0].auburnFGA - this[0].opponentFGA;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFGP': function() {
    return ((this[0].auburnFGM / this[0].auburnFGA) * 100).toFixed(1) + "%";
  },
  'opponentFGP': function() {
    return ((this[0].opponentFGM / this[0].opponentFGA) * 100).toFixed(1) + "%";
  },
  'fgpDiff': function() {
    var diff = ((this[0].auburnFGM / this[0].auburnFGA) * 100) - ((this[0].opponentFGM / this[0].opponentFGA) * 100);
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff).toFixed(1) + "%";
  },
  'auburn3PM': function() {
    return this[0].auburn3PM;
  },
  'opponent3PM': function() {
    return this[0].opponent3PM;
  },
  'threepmDiff': function() {
    var diff = this[0].auburn3PM - this[0].opponent3PM;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburn3PA': function() {
    return this[0].auburn3PA;
  },
  'opponent3PA': function() {
    return this[0].opponent3PA;
  },
  'threepaDiff': function() {
    var diff = this[0].auburn3PA - this[0].opponent3PA;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburn3PP': function() {
    return ((this[0].auburn3PM / this[0].auburn3PA) * 100).toFixed(1) + "%";
  },
  'opponent3PP': function() {
    return ((this[0].opponent3PM / this[0].opponent3PA) * 100).toFixed(1) + "%";
  },
  'threeppDiff': function() {
    var diff = ((this[0].auburn3PM / this[0].auburn3PA) * 100) - ((this[0].opponent3PM / this[0].opponent3PA) * 100);
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff).toFixed(1) + "%";
  },
  'auburn2PM': function() {
    return this[0].auburn2PM;
  },
  'opponent2PM': function() {
    return this[0].opponent2PM;
  },
  'twopmDiff': function() {
    var diff = this[0].auburn2PM - this[0].opponent2PM;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburn2PA': function() {
    return this[0].auburn2PA;
  },
  'opponent2PA': function() {
    return this[0].opponent2PA;
  },
  'twopaDiff': function() {
    var diff = this[0].auburn2PA - this[0].opponent2PA;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburn2PP': function() {
    return ((this[0].auburn2PM / this[0].auburn2PA) * 100).toFixed(1) + "%";
  },
  'opponent2PP': function() {
    return ((this[0].opponent2PM / this[0].opponent2PA) * 100).toFixed(1) + "%";
  },
  'twoppDiff': function() {
    var diff = ((this[0].auburn2PM / this[0].auburn2PA) * 100) - ((this[0].opponent2PM / this[0].opponent2PA) * 100);
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff).toFixed(1) + "%";
  },
  'auburnFTM': function() {
    return this[0].auburnFTM;
  },
  'opponentFTM': function() {
    return this[0].opponentFTM;
  },
  'ftmDiff': function() {
    var diff = this[0].auburnFTM - this[0].opponentFTM;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFTA': function() {
    return this[0].auburnFTA;
  },
  'opponentFTA': function() {
    return this[0].opponentFTA;
  },
  'ftaDiff': function() {
    var diff = this[0].auburnFTA - this[0].opponentFTA;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFTP': function() {
    return ((this[0].auburnFTM / this[0].auburnFTA) * 100).toFixed(1) + "%";
  },
  'opponentFTP': function() {
    return ((this[0].opponentFTM / this[0].opponentFTA) * 100).toFixed(1) + "%";
  },
  'ftpDiff': function() {
    var diff = ((this[0].auburnFTM / this[0].auburnFTA) * 100) - ((this[0].opponentFTM / this[0].opponentFTA) * 100);
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff).toFixed(1) + "%";
  },
  'auburnORB': function() {
    return this[0].auburnORB;
  },
  'opponentORB': function() {
    return this[0].opponentORB;
  },
  'orbDiff': function() {
    var diff = this[0].auburnORB - this[0].opponentORB;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnDRB': function() {
    return this[0].auburnDRB;
  },
  'opponentDRB': function() {
    return this[0].opponentDRB;
  },
  'drbDiff': function() {
    var diff = this[0].auburnDRB - this[0].opponentDRB;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnREB': function() {
    return this[0].auburnREB;
  },
  'opponentREB': function() {
    return this[0].opponentREB;
  },
  'rebDiff': function() {
    var diff = this[0].auburnREB - this[0].opponentREB;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnAST': function() {
    return this[0].auburnAST;
  },
  'opponentAST': function() {
    return this[0].opponentAST;
  },
  'astDiff': function() {
    var diff = this[0].auburnAST - this[0].opponentAST;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnTO': function() {
    return this[0].auburnTO;
  },
  'opponentTO': function() {
    return this[0].opponentTO;
  },
  'toDiff': function() {
    var diff = this[0].auburnTO - this[0].opponentTO;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnBLK': function() {
    return this[0].auburnBLK;
  },
  'opponentBLK': function() {
    return this[0].opponentBLK;
  },
  'blkDiff': function() {
    var diff = this[0].auburnBLK - this[0].opponentBLK;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnSTL': function() {
    return this[0].auburnSTL;
  },
  'opponentSTL': function() {
    return this[0].opponentSTL;
  },
  'stlDiff': function() {
    var diff = this[0].auburnSTL - this[0].opponentSTL;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnPF': function() {
    return this[0].auburnPF;
  },
  'opponentPF': function() {
    return this[0].opponentPF;
  },
  'pfDiff': function() {
    var diff = this[0].auburnPF - this[0].opponentPF;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnPOT': function() {
    return this[0].auburnPOT;
  },
  'opponentPOT': function() {
    return this[0].opponentPOT;
  },
  'potDiff': function() {
    var diff = this[0].auburnPOT - this[0].opponentPOT;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnPIP': function() {
    return this[0].auburnPIP;
  },
  'opponentPIP': function() {
    return this[0].opponentPIP;
  },
  'pipDiff': function() {
    var diff = this[0].auburnPIP - this[0].opponentPIP;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburn2CP': function() {
    return this[0].auburn2CP;
  },
  'opponent2CP': function() {
    return this[0].opponent2CP;
  },
  'scpDiff': function() {
    var diff = this[0].auburn2CP - this[0].opponent2CP;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnFBP': function() {
    return this[0].auburnFBP;
  },
  'opponentFBP': function() {
    return this[0].opponentFBP;
  },
  'fbpDiff': function() {
    var diff = this[0].auburnFBP - this[0].opponentFBP;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'auburnBP': function() {
    return this[0].auburnBP;
  },
  'opponentBP': function() {
    return this[0].opponentBP;
  },
  'bpDiff': function() {
    var diff = this[0].auburnBP - this[0].opponentBP;
    if (diff > 0) {
      var sign = "+";
    } else if (diff < 0) {
      var sign = "-";
    } else {
      var sign = "";
    }
    return sign + Math.abs(diff);
  },
  'playerData': function() {
    var date = this[0].date
    var output = PlayerStats.find({playerDate: date}, {sort: {playerMIN: 1}}).fetch();
    return output;
  },
  'starter': function() {
    if (this.playerStarter === true) {
      return "[S]";
    } else {
      return "";
    }
  },
  'fgp': function() {
    var output = ((this.playerFGM / this.playerFGA) * 100 ).toFixed(1) + "%";
    return output;
  },
  'threepp': function() {
    var output = ((this.player3PM / this.player3PA) * 100 ).toFixed(1) + "%";
    return output;
  },
  'twopp': function() {
    var output = ((this.player2PM / this.player2PM) * 100 ).toFixed(1) + "%";
    return output;
  },
  'ftp': function() {
    var output = ((this.playerFTM / this.playerFTA) * 100 ).toFixed(1) + "%";
    return output;
  }
});
