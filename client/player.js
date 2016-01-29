Session.set('span', 0);

Router.route('/player');

Router.route('/player/:link', {
  name: 'playerPage',
  template: 'playerPage',
  data: function(){
    var linkName = this.params.link;
    var stringName = linkName.replace("+", " ");
    Session.set('currentPlayer', stringName);
    var playerStats = PlayerStats.find({playerName: stringName}).fetch();
    return playerStats;
  }
});

Template.player.helpers({
  'playerList': function(){
    var startDate = new Date(2015, 9, 1);
    var endDate = new Date(2016, 9, 1);
    var players = PlayerStats.find({playerDate: {$gte: startDate, $lt: endDate}}, {fields: { playerName: 1 }}).fetch();
    var uniquePlayers = _.uniq(players, false, function(d){return d.playerName});
    var playerStrings = _.pluck(uniquePlayers, 'playerName');
    var playersList = [];
    for(i = 0; i < playerStrings.length; i++) {
      playersList.push({name: playerStrings[i], link: playerStrings[i].replace(" ", "+")});
    }
    return playersList;
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
    var apg = total / this.length;
    var output = (Math.round(apg * 10) / 10).toFixed(1);
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
