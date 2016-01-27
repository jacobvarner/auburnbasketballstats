Router.route('/player');

Template.player.helpers({
  'playerList': function(){
    var startDate = new Date(2015, 9, 1);
    var endDate = new Date(2016, 9, 1);
    var players = PlayerStats.find({playerDate: {$gte: startDate, $lt: endDate}}, {fields: { playerName: 1 }}).fetch();
    var uniquePlayers = _.uniq(players, false, function(d){return d.playerName});
    return _.pluck(uniquePlayers, 'playerName');
  }
});
