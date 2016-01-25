Router.route('/submit');

Template.statsInput.events({
  'submit form': function(event){
    event.preventDefault();

    var opponent = $('[name=opponent]').val();
    var date = $('[name=date]').val();
    var location = $('[name=location]').val();
    var attendance = $('[name=attendance]').val();

    var auburnFGM = $('[name=auburnFGM]').val();
    var auburnFGA = $('[name=auburnFGA]').val();
    var auburn3PM = $('[name=auburn3PM]').val();
    var auburn3PA = $('[name=auburn3PA]').val();
    var auburn2PM = auburnFGM - auburn3PM;
    var auburn2PA = auburnFGA - auburn3PA;
    var auburnFTM = $('[name=auburnFTM]').val();
    var auburnFTA = $('[name=auburnFTA]').val();
    var auburnORB = $('[name=auburnORB]').val();
    var auburnDRB = $('[name=auburnDRB]').val();
    var auburnREB = auburnORB + auburnDRB;
    var auburnPoints = $('[name=auburnPoints]').val();
    var auburnAST = $('[name=auburnAST]').val();
    var auburnTO = $('[name=auburnTO]').val();
    var auburnBLK = $('[name=auburnBLK]').val();
    var auburnSTL = $('[name=auburnSTL]').val();
    var auburnPF = $('[name=auburnPF]').val();
    var auburnMIN = $('[name=auburnMIN]').val();
    var auburnPOT = $('[name=auburnPOT]').val();
    var auburnPIP = $('[name=auburnPIP]').val();
    var auburn2CP = $('[name=auburn2CP]').val();
    var auburnFBP = $('[name=auburnFBP]').val();
    var auburnBP = $('[name=auburnBP]').val();

    var opponentFGM = $('[name=opponentFGM]').val();
    var opponentFGA = $('[name=opponentFGA]').val();
    var opponent3PM = $('[name=opponent3PM]').val();
    var opponent3PA = $('[name=opponent3PA]').val();
    var opponent2PM = opponentFGM - opponent3PM;
    var opponent2PA = opponentFGA - opponent3PA;
    var opponentFTM = $('[name=opponentFTM]').val();
    var opponentFTA = $('[name=opponentFTA]').val();
    var opponentORB = $('[name=opponentORB]').val();
    var opponentDRB = $('[name=opponentDRB]').val();
    var opponentREB = opponentORB + opponentDRB;
    var opponentPoints = $('[name=opponentPoints]').val();
    var opponentAST = $('[name=opponentAST]').val();
    var opponentTO = $('[name=opponentTO]').val();
    var opponentBLK = $('[name=opponentBLK]').val();
    var opponentSTL = $('[name=opponentSTL]').val();
    var opponentPF = $('[name=opponentPF]').val();
    var opponentMIN = $('[name=opponentMIN]').val();
    var opponentPOT = $('[name=opponentPOT]').val();
    var opponentPIP = $('[name=opponentPIP]').val();
    var opponent2CP = $('[name=opponent2CP]').val();
    var opponentFBP = $('[name=opponentFBP]').val();
    var opponentBP = $('[name=opponentBP]').val();

    var playerName1 = $('[name=playerName1]').val();
    if($('[name=playerStarter1]').val() === "yes") {
      var playerStarter1 = true;
    } else {
      var playerStarter1 = false;
    }
    var playerDate = date;
  }
});
