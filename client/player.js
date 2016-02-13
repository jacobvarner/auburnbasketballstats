Session.set('span', 0);
Session.set('playersSeason', "2015-2016"); //UPDATE AFTER EACH SEASON

Router.route('/player');

Router.route('/player/:season/:player', {
  name: 'playerPage',
  template: 'playerPage',
  data: function(){
    var playerName = this.params.player;
    var season = this.params.season;
    var stringName = linkName.replace("+", " ");
    Session.set('currentPlayer', stringName);
    Session.set('currentSeason', season);
    var playerStats = PlayerStats.find({playerName: stringName, season: season}).fetch();
    return playerStats;
  }
});

Template.player.events({
  'change #season-select': function() {
    Session.set('playersSeason', $('#season-select').val());
  }
});

Template.player.helpers({
  'playerList': function(){
    var season = Session.get('playersSeason');
    var playerStrings = PlayerStats.find({ playerSeason: season }, {sort: {playerName: 1}, fields: {playerName: 1}}).fetch();
    playerStrings = _.pluck(playerStrings, 'playerName');
    playerStrings = _.uniq(playerStrings, true);
    var playersList = [];
    for(i = 0; i < playerStrings.length; i++) {
      playersList.push({name: playerStrings[i].playerName, season: season, player: playerStrings[i].playerName.replace(" ", "+")});
    }
    return playersList;
  },
  'seasonList': function() {
    var seasons = PlayerStats.find({}, {sort: {playerSeason: -1}, fields: {playerSeason: 1}}).fetch();
    seasons = _.pluck(seasons, 'playerSeason');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  }
});

Template.playerPage.helpers({
  'name': function() {
    return this[0].playerName;
  },
  'season3': function() {
    var output = false;
    var games = PlayerStats.find({ playerName: this[0].playerName }).count();
    if (games > 3) {
      output = true;
    }
    return output;
  },
  'season5': function() {
    var output = false;
    var games = PlayerStats.find({ playerName: this[0].playerName }).count();
    if (games > 5) {
      output = true;
    }
    return output;
  },
  'season10': function() {
    var output = false;
    var games = PlayerStats.find({ playerName: this[0].playerName }).count();
    if (games > 10) {
      output = true;
    }
    return output;
  },
  'points': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerPoints;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerPoints;
      }
    }
    return total;
  },
  'ppg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerPoints;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerPoints;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var ppg = total / (this.length);
    var output = (Math.round(ppg * 10) / 10).toFixed(1);
    return output;
  },
  'rebounds': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerREB;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerREB;
      }
    }
    return total;
  },
  'rpg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerREB;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerREB;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rpg = total / this.length;
    var output = (Math.round(rpg * 10) / 10).toFixed(1);
    return output;
  },
  'assists': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerAST;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerAST;
      }
    }
    return total;
  },
  'apg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerAST;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerAST;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var apg = total / this.length;
    var output = (Math.round(apg * 10) / 10).toFixed(1);
    return output;
  },
  'fgp': function() {
    var total1 = 0;
    var total2 = 0
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total1 += this[i].playerFGM;
        total2 += this[i].playerFGA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total1 += this[i].playerFGM;
        total1 += this[i].playerFGA;
      }
    }
    var percent = ((total1 / total2) * 100).toFixed(1);
    return percent;
  },
  'fgm': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerFGM;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerFGM;
      }
    }
    return total;
  },
  'fga': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerFGA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerFGA;
      }
    }
    return total;
  },
  'threepp': function() {
    var total1 = 0;
    var total2 = 0
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total1 += this[i].player3PM;
        total2 += this[i].player3PA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total1 += this[i].player3PM;
        total1 += this[i].player3PA;
      }
    }
    var percent = ((total1 / total2) * 100).toFixed(1);
    return percent;
  },
  'threepm': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].player3PM;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].player3PM;
      }
    }
    return total;
  },
  'threepa': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].player3PA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].player3PA;
      }
    }
    return total;
  },
  'twopp': function() {
    var total1 = 0;
    var total2 = 0
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total1 += this[i].player2PM;
        total2 += this[i].player2PA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total1 += this[i].player2PM;
        total1 += this[i].player2PA;
      }
    }
    var percent = ((total1 / total2) * 100).toFixed(1);
    return percent;
  },
  'twopm': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].player2PM;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].player2PM;
      }
    }
    return total;
  },
  'twopa': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].player2PA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].player2PA;
      }
    }
    return total;
  },
  'ftp': function() {
    var total1 = 0;
    var total2 = 0
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total1 += this[i].playerFTM;
        total2 += this[i].playerFTA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total1 += this[i].playerFTM;
        total1 += this[i].playerFTA;
      }
    }
    var percent = ((total1 / total2) * 100).toFixed(1);
    return percent;
  },
  'ftm': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerFTM;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerFTM;
      }
    }
    return total;
  },
  'fta': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerFTA;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerFTA;
      }
    }
    return total;
  },
  'blocks': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerBLK;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerBLK;
      }
    }
    return total;
  },
  'bpg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerBLK;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerBLK;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rate = total / (this.length);
    var output = (Math.round(rate * 10) / 10).toFixed(1);
    return output;
  },
  'steals': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerSTL;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerSTL;
      }
    }
    return total;
  },
  'spg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerSTL;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerSTL;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rate = total / (this.length);
    var output = (Math.round(rate * 10) / 10).toFixed(1);
    return output;
  },
  'turnovers': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerTO;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerTO;
      }
    }
    return total;
  },
  'topg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerTO;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerTO;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rate = total / (this.length);
    var output = (Math.round(rate * 10) / 10).toFixed(1);
    return output;
  },
  'fouls': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerPF;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerPF;
      }
    }
    return total;
  },
  'pfpg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerPF;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerPF;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rate = total / (this.length);
    var output = (Math.round(rate * 10) / 10).toFixed(1);
    return output;
  },
  'minutes': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerMIN;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerMIN;
      }
    }
    return total;
  },
  'mpg': function() {
    var total = 0;
    var span = Session.get('span');
    if (span === 0) {
      for (i = 0; i < this.length; i++) {
        total += this[i].playerMIN;
      }
    } else {
      for (i = (this.length - span); i < this.length; i++) {
        total += this[i].playerMIN;
      }
    }
    if (total === 0) {
      var output = 0.0;
      return output;
    }
    var rate = total / (this.length);
    var output = (Math.round(rate * 10) / 10).toFixed(1);
    return output;
  }

});

Template.games.helpers({
  'playerGames': function() {
    var currentPlayer = Session.get('currentPlayer');
    var games = PlayerStats.find({ playerName: currentPlayer }, {sort: { playerDate: -1 }});
    return games;
  },
  'getDate': function(){
    var d = this.playerDate;
    var month = d.getUTCMonth() + 1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var output = month + "/" + day + "/" + year;
    return output;
  }
});

Template.playerPage.events({
  'change .span': function() {
    var span = parseInt($('.span').val());
    Session.set('span', span);
  }
});
