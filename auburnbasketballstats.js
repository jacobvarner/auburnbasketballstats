GamesList = new Mongo.Collection('games');
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.addGame.events({
    'submit form': function(event){
      event.preventDefault();
      var gameDate = event.target.gameDate.value;
      var gameLocation = event.target.gameLocation.value;
      var gameOpponent = event.target.gameOpponent.value;
      var gameAttendance = event.target.gameAttendance.value;
      var gameAuburnScore =  event.target.gameAuburnScore.value;
      var gameOpponentScore = event.target.gameOpponentScore.value;
      var gameAuburnPOT = event.target.gameAuburnPOT.value;
      var gameOpponentPOT = event.target.gameOpponentPOT.value;
      var gameAuburnPIP = event.target.gameAuburnPIP.value;
      var gameOpponentPIP = event.target.gameOpponentPIP.value;
      var gameAuburn2CP = event.target.gameAuburn2CP.value;
      var gameOpponent2CP = event.target.gameOpponent2CP.value;
      var gameAuburnFBP = event.target.gameAuburnFBP.value;
      var gameOpponentFBP = event.target.gameOpponentFBP.value;
      var gameAuburnBP = event.target.gameAuburnBP.value;
      var gameOpponentBP = event.target.gameOpponentBP.value;

      GamesList.insert({
        date: gameDate,
        location: gameLocation,
        opponent: gameOpponent,
        attendance: parseInt(gameAttendance),
        auburnScore: parseInt(gameAuburnScore),
        opponentScore: parseInt(gameOpponentScore),
        auburnPOT: parseInt(gameAuburnPOT),
        opponentPOT: parseInt(gameOpponentPOT),
        auburnPIP: parseInt(gameAuburnPIP),
        opponentPIP: parseInt(gameOpponentPIP),
        auburn2CP: parseInt(gameAuburn2CP),
        opponent2CP: parseInt(gameOpponent2CP),
        auburnFBP: parseInt(gameAuburnFBP),
        opponentFBP: parseInt(gameOpponentFBP),
        auburnBP: parseInt(gameAuburnBP),
        opponentBP: parseInt(gameOpponentBP)
      });

      var form = event.target;
      form.reset();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
