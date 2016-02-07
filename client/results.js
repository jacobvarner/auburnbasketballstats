Router.route('/results');

Router.route('/results/:date/:opponent', {
  name: "resultsGame",
  template: "resultsGame",
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
  data: function() {
    var teamLink = this.params.team;
    var teamString = teamLink.replace("+", " ");
    Session.set('team', teamString);
    var teamResults = SeasonInfo.find({opponent: teamString}).fetch();
    return teamResults;
  }
});

Session.set('resultsSeason', "2015-2016"); //UPDATE AFTER EACH SEASON

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
    var winPercentage = ((wins / (wins + losses + ties)) * 100).toFixed(2);
    var confWinPercentage = ((confWins / (confWins + confLosses + confTies)) * 100).toFixed(2);
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ") : " + winPercentage + "% (" + confWinPercentage + "%)";
  },
  'getHomeRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Home"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Home"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Home"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Home", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Home", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Home", conference: true}).count();
    var winPercentage = ((wins / (wins + losses + ties)) * 100).toFixed(2);
    var confWinPercentage = ((confWins / (confWins + confLosses + confTies)) * 100).toFixed(2);
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ") : " + winPercentage + "% (" + confWinPercentage + "%)";
  },
  'getAwayRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Away"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Away"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Away"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Away", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Away", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Away", conference: true}).count();
    var winPercentage = ((wins / (wins + losses + ties)) * 100).toFixed(2);
    var confWinPercentage = ((confWins / (confWins + confLosses + confTies)) * 100).toFixed(2);
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ") : " + winPercentage + "% (" + confWinPercentage + "%)";
  },
  'getNeutralRecordAllTime': function() {
    var wins = SeasonInfo.find({result: "W", location: "Neutral"}).count();
    var losses = SeasonInfo.find({result: "L", location: "Neutral"}).count();
    var ties = SeasonInfo.find({result: "T", location: "Neutral"}).count();
    var confWins = SeasonInfo.find({result: "W", location: "Neutral", conference: true}).count();
    var confLosses = SeasonInfo.find({result: "L", location: "Neutral", conference: true}).count();
    var confTies = SeasonInfo.find({result: "T", location: "Neutral", conference: true}).count();
    var winPercentage = ((wins / (wins + losses + ties)) * 100).toFixed(2);
    var confWinPercentage = ((confWins / (confWins + confLosses + confTies)) * 100).toFixed(2);
    return wins + "-" + losses + "-" + ties + " " + "(" + confWins + "-" + confLosses + "-" + confTies + ") : " + winPercentage + "% (" + confWinPercentage + "%)";
  }
});

Template.resultsTeam.helpers({
  'teamName': function() {
    var team = Session.get('team');
    return team;
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
      var winner = team;
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
  }
});

Template.resultsGame.helpers({
  'opponent': function() {
    return this[0].opponent;
  },
  'date': function() {
    var d = this[0].date;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var output = month + "/" + day + "/" + year;
    return output;
  }
});
