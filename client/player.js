Router.route('/player');

Router.route('/player/:link', {
  name: 'playerPage',
  template: 'playerPage',
  data: function(){
    var linkName = this.params.link;
    var stringName = linkName.replace("+", " ");
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
  'getName': function() {
    return this[0].playerName;
  },
  'ppg': function() {
    var total = 0;
    for (i = 0; i < this.length; i++) {
      total += this[i].playerPoints;
    }
    var ppg = total / (this.length);
    var output = (Math.round(ppg * 10) / 10).toFixed(1);
    return output;

  }
});
