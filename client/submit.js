Router.route('/submit');

Router.route('/submit/team', {
  name: 'teamInput',
  template: 'teamInput'
});
Router.route('/submit/game', {
  name: 'statsInput',
  template: 'statsInput'
});

Template.teamInput.events({
  'submit form': function(event){
    event.preventDefault();

    PlayerInfo.insert({
      season: $('[name=season]').val(),
      name: $('[name=name]').val(),
      number: parseInt($('[name=number]').val()),
      position: $('[name=position]').val(),
      height: $('[name=height]').val(),
      weight: $('[name=weight]').val(),
      class: $('[name=class]').val(),
      transfer: $('[name=transfer]').val(),
      hometown: $('[name=hometown]').val(),
      lastSchool: $('[name=lastSchool]').val()
    });

    $('.addPlayer').val('');
  }
});

Template.teamInput.helpers({
  'currentTeam': function(){
    var season = "2015-2016";
    var output = PlayerInfo.find({ season: season}, {sort: { number: 1 }}).fetch();
    return output;
  }
});

Template.statsInput.events({
  'submit form': function(event){
    event.preventDefault();

    var opponent = $('[name=opponent]').val();
    var date = new Date($('[name=date]').val());
    var location = $('[name=location]').val();
    var attendance = parseInt($('[name=attendance]').val());

    var auburnFGM = parseInt($('[name=auburnFGM]').val());
    var auburnFGA = parseInt($('[name=auburnFGA]').val());
    var auburn3PM = parseInt($('[name=auburn3PM]').val());
    var auburn3PA = parseInt($('[name=auburn3PA]').val());
    var auburn2PM = auburnFGM - auburn3PM;
    var auburn2PA = auburnFGA - auburn3PA;
    var auburnFTM = parseInt($('[name=auburnFTM]').val());
    var auburnFTA = parseInt($('[name=auburnFTA]').val());
    var auburnORB = parseInt($('[name=auburnORB]').val());
    var auburnDRB = parseInt($('[name=auburnDRB]').val());
    var auburnREB = auburnORB + auburnDRB;
    var auburnPoints = parseInt($('[name=auburnPoints]').val());
    var auburnAST = parseInt($('[name=auburnAST]').val());
    var auburnTO = parseInt($('[name=auburnTO]').val());
    var auburnBLK = parseInt($('[name=auburnBLK]').val());
    var auburnSTL = parseInt($('[name=auburnSTL]').val());
    var auburnPF = parseInt($('[name=auburnPF]').val());
    var auburnMIN = parseInt($('[name=auburnMIN]').val());
    var auburnPOT = parseInt($('[name=auburnPOT]').val());
    var auburnPIP = parseInt($('[name=auburnPIP]').val());
    var auburn2CP = parseInt($('[name=auburn2CP]').val());
    var auburnFBP = parseInt($('[name=auburnFBP]').val());
    var auburnBP = parseInt($('[name=auburnBP]').val());

    var opponentFGM = parseInt($('[name=opponentFGM]').val());
    var opponentFGA = parseInt($('[name=opponentFGA]').val());
    var opponent3PM = parseInt($('[name=opponent3PM]').val());
    var opponent3PA = parseInt($('[name=opponent3PA]').val());
    var opponent2PM = opponentFGM - opponent3PM;
    var opponent2PA = opponentFGA - opponent3PA;
    var opponentFTM = parseInt($('[name=opponentFTM]').val());
    var opponentFTA = parseInt($('[name=opponentFTA]').val());
    var opponentORB = parseInt($('[name=opponentORB]').val());
    var opponentDRB = parseInt($('[name=opponentDRB]').val());
    var opponentREB = opponentORB + opponentDRB;
    var opponentPoints = parseInt($('[name=opponentPoints]').val());
    var opponentAST = parseInt($('[name=opponentAST]').val());
    var opponentTO = parseInt($('[name=opponentTO]').val());
    var opponentBLK = parseInt($('[name=opponentBLK]').val());
    var opponentSTL = parseInt($('[name=opponentSTL]').val());
    var opponentPF = parseInt($('[name=opponentPF]').val());
    var opponentMIN = parseInt($('[name=opponentMIN]').val());
    var opponentPOT = parseInt($('[name=opponentPOT]').val());
    var opponentPIP = parseInt($('[name=opponentPIP]').val());
    var opponent2CP = parseInt($('[name=opponent2CP]').val());
    var opponentFBP = parseInt($('[name=opponentFBP]').val());
    var opponentBP = parseInt($('[name=opponentBP]').val());

    if($('.game').val() === null || $('.game').val() === '') {
      alert("Please fill in all game stats!");
    } else {
      GameStats.insert({
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

    $('[name=opponent]').val('');
    $('[name=date]').val('');
    $('[name=location]').val('');
    $('[name=attendance]').val('');

    $('[name=auburnFGM]').val('');
    $('[name=auburnFGA]').val('');
    $('[name=auburn3PM]').val('');
    $('[name=auburn3PA]').val('');
    $('[name=auburnFTM]').val('');
    $('[name=auburnFTA]').val('');
    $('[name=auburnORB]').val('');
    $('[name=auburnDRB]').val('');
    $('[name=auburnPoints]').val('');
    $('[name=auburnAST]').val('');
    $('[name=auburnTO]').val('');
    $('[name=auburnBLK]').val('');
    $('[name=auburnSTL]').val('');
    $('[name=auburnPF]').val('');
    $('[name=auburnMIN]').val('');
    $('[name=auburnPOT]').val('');
    $('[name=auburnPIP]').val('');
    $('[name=auburn2CP]').val('');
    $('[name=auburnFBP]').val('');
    $('[name=auburnBP]').val('');

    $('[name=opponentFGM]').val('');
    $('[name=opponentFGA]').val('');
    $('[name=opponent3PM]').val('');
    $('[name=opponent3PA]').val('');
    $('[name=opponentFTM]').val('');
    $('[name=opponentFTA]').val('');
    $('[name=opponentORB]').val('');
    $('[name=opponentDRB]').val('');
    $('[name=opponentPoints]').val('');
    $('[name=opponentAST]').val('');
    $('[name=opponentTO]').val('');
    $('[name=opponentBLK]').val('');
    $('[name=opponentSTL]').val('');
    $('[name=opponentPF]').val('');
    $('[name=opponentMIN]').val('');
    $('[name=opponentPOT]').val('');
    $('[name=opponentPIP]').val('');
    $('[name=opponent2CP]').val('');
    $('[name=opponentFBP]').val('');
    $('[name=opponentBP]').val('');

    var playerName1 = $('[name=playerName1]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter1]').val() === "yes") {
      var playerStarter1 = true;
    } else {
      var playerStarter1 = false;
    }
    var playerFGM1 = parseInt($('[name=playerFGM1]').val());
    var playerFGA1 = parseInt($('[name=playerFGA1]').val());
    var player3PM1 = parseInt($('[name=player3PM1]').val());
    var player3PA1 = parseInt($('[name=player3PA1]').val());
    var player2PM1 = playerFGM1 - player3PM1;
    var player2PA1 = playerFGA1 - player3PA1;
    var playerFTM1 = parseInt($('[name=playerFTM1]').val());
    var playerFTA1 = parseInt($('[name=playerFTA1]').val());
    var playerORB1 = parseInt($('[name=playerORB1]').val());
    var playerDRB1 = parseInt($('[name=playerDRB1]').val());
    var playerREB1 = playerORB1 + playerDRB1;
    var playerPoints1 = parseInt($('[name=playerPoints1]').val());
    var playerAST1 = parseInt($('[name=playerAST1]').val());
    var playerTO1 = parseInt($('[name=playerTO1]').val());
    var playerBLK1 = parseInt($('[name=playerBLK1]').val());
    var playerSTL1 = parseInt($('[name=playerSTL1]').val());
    var playerPF1 = parseInt($('[name=playerPF1]').val());
    var playerMIN1 = parseInt($('[name=playerMIN1]').val());

    if($('.player1').val() != null && $('.player1').val() != ''){
      PlayerStats.insert({
        playerName: playerName1,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter1,
        playerFGM: playerFGM1,
        playerFGA: playerFGA1,
        player3PM: player3PM1,
        player3PA: player3PA1,
        player2PM: player2PM1,
        player2PA: player2PA1,
        playerFTM: playerFTM1,
        playerFTA: playerFTA1,
        playerORB: playerORB1,
        playerDRB: playerDRB1,
        playerREB: playerREB1,
        playerPoints: playerPoints1,
        playerAST: playerAST1,
        playerTO: playerTO1,
        playerBLK: playerBLK1,
        playerSTL: playerSTL1,
        playerPF: playerPF1,
        playerMIN: playerMIN1
      });
    }

    $('.player1').val('');

    var playerName2 = $('[name=playerName2]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter2]').val() === "yes") {
      var playerStarter2 = true;
    } else {
      var playerStarter2 = false;
    }
    var playerFGM2 = parseInt($('[name=playerFGM2]').val());
    var playerFGA2 = parseInt($('[name=playerFGA2]').val());
    var player3PM2 = parseInt($('[name=player3PM2]').val());
    var player3PA2 = parseInt($('[name=player3PA2]').val());
    var player2PM2 = playerFGM2 - player3PM2;
    var player2PA2 = playerFGA2 - player3PA2;
    var playerFTM2 = parseInt($('[name=playerFTM2]').val());
    var playerFTA2 = parseInt($('[name=playerFTA2]').val());
    var playerORB2 = parseInt($('[name=playerORB2]').val());
    var playerDRB2 = parseInt($('[name=playerDRB2]').val());
    var playerREB2 = playerORB2 + playerDRB2;
    var playerPoints2 = parseInt($('[name=playerPoints2]').val());
    var playerAST2 = parseInt($('[name=playerAST2]').val());
    var playerTO2 = parseInt($('[name=playerTO2]').val());
    var playerBLK2 = parseInt($('[name=playerBLK2]').val());
    var playerSTL2 = parseInt($('[name=playerSTL2]').val());
    var playerPF2 = parseInt($('[name=playerPF2]').val());
    var playerMIN2 = parseInt($('[name=playerMIN2]').val());

    if($('.player2').val() != null && $('.player2').val() != ''){
      PlayerStats.insert({
        playerName: playerName2,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter2,
        playerFGM: playerFGM2,
        playerFGA: playerFGA2,
        player3PM: player3PM2,
        player3PA: player3PA2,
        player2PM: player2PM2,
        player2PA: player2PA2,
        playerFTM: playerFTM2,
        playerFTA: playerFTA2,
        playerORB: playerORB2,
        playerDRB: playerDRB2,
        playerREB: playerREB2,
        playerPoints: playerPoints2,
        playerAST: playerAST2,
        playerTO: playerTO2,
        playerBLK: playerBLK2,
        playerSTL: playerSTL2,
        playerPF: playerPF2,
        playerMIN: playerMIN2
      });
    }

    $('.player2').val('');

    var playerName3 = $('[name=playerName3]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter3]').val() === "yes") {
      var playerStarter3 = true;
    } else {
      var playerStarter3 = false;
    }
    var playerFGM3 = parseInt($('[name=playerFGM3]').val());
    var playerFGA3 = parseInt($('[name=playerFGA3]').val());
    var player3PM3 = parseInt($('[name=player3PM3]').val());
    var player3PA3 = parseInt($('[name=player3PA3]').val());
    var player2PM3 = playerFGM3 - player3PM3;
    var player2PA3 = playerFGA3 - player3PA3;
    var playerFTM3 = parseInt($('[name=playerFTM3]').val());
    var playerFTA3 = parseInt($('[name=playerFTA3]').val());
    var playerORB3 = parseInt($('[name=playerORB3]').val());
    var playerDRB3 = parseInt($('[name=playerDRB3]').val());
    var playerREB3 = playerORB3 + playerDRB3;
    var playerPoints3 = parseInt($('[name=playerPoints3]').val());
    var playerAST3 = parseInt($('[name=playerAST3]').val());
    var playerTO3 = parseInt($('[name=playerTO3]').val());
    var playerBLK3 = parseInt($('[name=playerBLK3]').val());
    var playerSTL3 = parseInt($('[name=playerSTL3]').val());
    var playerPF3 = parseInt($('[name=playerPF3]').val());
    var playerMIN3 = parseInt($('[name=playerMIN3]').val());

    if($('.player3').val() != null && $('.player3').val() != ''){
      PlayerStats.insert({
        playerName: playerName3,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter3,
        playerFGM: playerFGM3,
        playerFGA: playerFGA3,
        player3PM: player3PM3,
        player3PA: player3PA3,
        player2PM: player2PM3,
        player2PA: player2PA3,
        playerFTM: playerFTM3,
        playerFTA: playerFTA3,
        playerORB: playerORB3,
        playerDRB: playerDRB3,
        playerREB: playerREB3,
        playerPoints: playerPoints3,
        playerAST: playerAST3,
        playerTO: playerTO3,
        playerBLK: playerBLK3,
        playerSTL: playerSTL3,
        playerPF: playerPF3,
        playerMIN: playerMIN3
      });
    }

    $('.player3').val('');

    var playerName4 = $('[name=playerName4]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter4]').val() === "yes") {
      var playerStarter4 = true;
    } else {
      var playerStarter4 = false;
    }
    var playerFGM4 = parseInt($('[name=playerFGM4]').val());
    var playerFGA4 = parseInt($('[name=playerFGA4]').val());
    var player3PM4 = parseInt($('[name=player3PM4]').val());
    var player3PA4 = parseInt($('[name=player3PA4]').val());
    var player2PM4 = playerFGM4 - player3PM4;
    var player2PA4 = playerFGA4 - player3PA4;
    var playerFTM4 = parseInt($('[name=playerFTM4]').val());
    var playerFTA4 = parseInt($('[name=playerFTA4]').val());
    var playerORB4 = parseInt($('[name=playerORB4]').val());
    var playerDRB4 = parseInt($('[name=playerDRB4]').val());
    var playerREB4 = playerORB4 + playerDRB4;
    var playerPoints4 = parseInt($('[name=playerPoints4]').val());
    var playerAST4 = parseInt($('[name=playerAST4]').val());
    var playerTO4 = parseInt($('[name=playerTO4]').val());
    var playerBLK4 = parseInt($('[name=playerBLK4]').val());
    var playerSTL4 = parseInt($('[name=playerSTL4]').val());
    var playerPF4 = parseInt($('[name=playerPF4]').val());
    var playerMIN4 = parseInt($('[name=playerMIN4]').val());

    if($('.player4').val() != null && $('.player4').val() != ''){
      PlayerStats.insert({
        playerName: playerName4,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter4,
        playerFGM: playerFGM4,
        playerFGA: playerFGA4,
        player3PM: player3PM4,
        player3PA: player3PA4,
        player2PM: player2PM4,
        player2PA: player2PA4,
        playerFTM: playerFTM4,
        playerFTA: playerFTA4,
        playerORB: playerORB4,
        playerDRB: playerDRB4,
        playerREB: playerREB4,
        playerPoints: playerPoints4,
        playerAST: playerAST4,
        playerTO: playerTO4,
        playerBLK: playerBLK4,
        playerSTL: playerSTL4,
        playerPF: playerPF4,
        playerMIN: playerMIN4
      });
    }

    $('.player4').val('');

    var playerName5 = $('[name=playerName5]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter5]').val() === "yes") {
      var playerStarter5 = true;
    } else {
      var playerStarter5 = false;
    }
    var playerFGM5 = parseInt($('[name=playerFGM5]').val());
    var playerFGA5 = parseInt($('[name=playerFGA5]').val());
    var player3PM5 = parseInt($('[name=player3PM5]').val());
    var player3PA5 = parseInt($('[name=player3PA5]').val());
    var player2PM5 = playerFGM5 - player3PM5;
    var player2PA5 = playerFGA5 - player3PA5;
    var playerFTM5 = parseInt($('[name=playerFTM5]').val());
    var playerFTA5 = parseInt($('[name=playerFTA5]').val());
    var playerORB5 = parseInt($('[name=playerORB5]').val());
    var playerDRB5 = parseInt($('[name=playerDRB5]').val());
    var playerREB5 = playerORB5 + playerDRB5;
    var playerPoints5 = parseInt($('[name=playerPoints5]').val());
    var playerAST5 = parseInt($('[name=playerAST5]').val());
    var playerTO5 = parseInt($('[name=playerTO5]').val());
    var playerBLK5 = parseInt($('[name=playerBLK5]').val());
    var playerSTL5 = parseInt($('[name=playerSTL5]').val());
    var playerPF5 = parseInt($('[name=playerPF5]').val());
    var playerMIN5 = parseInt($('[name=playerMIN5]').val());

    if($('.player5').val() != null && $('.player5').val() != ''){
      PlayerStats.insert({
        playerName: playerName5,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter5,
        playerFGM: playerFGM5,
        playerFGA: playerFGA5,
        player3PM: player3PM5,
        player3PA: player3PA5,
        player2PM: player2PM5,
        player2PA: player2PA5,
        playerFTM: playerFTM5,
        playerFTA: playerFTA5,
        playerORB: playerORB5,
        playerDRB: playerDRB5,
        playerREB: playerREB5,
        playerPoints: playerPoints5,
        playerAST: playerAST5,
        playerTO: playerTO5,
        playerBLK: playerBLK5,
        playerSTL: playerSTL5,
        playerPF: playerPF5,
        playerMIN: playerMIN5
      });
    }

    $('.player5').val('');

    var playerName6 = $('[name=playerName6]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter6]').val() === "yes") {
      var playerStarter6 = true;
    } else {
      var playerStarter6 = false;
    }
    var playerFGM6 = parseInt($('[name=playerFGM6]').val());
    var playerFGA6 = parseInt($('[name=playerFGA6]').val());
    var player3PM6 = parseInt($('[name=player3PM6]').val());
    var player3PA6 = parseInt($('[name=player3PA6]').val());
    var player2PM6 = playerFGM6 - player3PM6;
    var player2PA6 = playerFGA6 - player3PA6;
    var playerFTM6 = parseInt($('[name=playerFTM6]').val());
    var playerFTA6 = parseInt($('[name=playerFTA6]').val());
    var playerORB6 = parseInt($('[name=playerORB6]').val());
    var playerDRB6 = parseInt($('[name=playerDRB6]').val());
    var playerREB6 = playerORB6 + playerDRB6;
    var playerPoints6 = parseInt($('[name=playerPoints6]').val());
    var playerAST6 = parseInt($('[name=playerAST6]').val());
    var playerTO6 = parseInt($('[name=playerTO6]').val());
    var playerBLK6 = parseInt($('[name=playerBLK6]').val());
    var playerSTL6 = parseInt($('[name=playerSTL6]').val());
    var playerPF6 = parseInt($('[name=playerPF6]').val());
    var playerMIN6 = parseInt($('[name=playerMIN6]').val());

    if($('.player6').val() != null && $('.player6').val() != ''){
      PlayerStats.insert({
        playerName: playerName6,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter6,
        playerFGM: playerFGM6,
        playerFGA: playerFGA6,
        player3PM: player3PM6,
        player3PA: player3PA6,
        player2PM: player2PM6,
        player2PA: player2PA6,
        playerFTM: playerFTM6,
        playerFTA: playerFTA6,
        playerORB: playerORB6,
        playerDRB: playerDRB6,
        playerREB: playerREB6,
        playerPoints: playerPoints6,
        playerAST: playerAST6,
        playerTO: playerTO6,
        playerBLK: playerBLK6,
        playerSTL: playerSTL6,
        playerPF: playerPF6,
        playerMIN: playerMIN6
      });
    }

    $('.player6').val('');

    var playerName7 = $('[name=playerName7]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter7]').val() === "yes") {
      var playerStarter7 = true;
    } else {
      var playerStarter7 = false;
    }
    var playerFGM7 = parseInt($('[name=playerFGM7]').val());
    var playerFGA7 = parseInt($('[name=playerFGA7]').val());
    var player3PM7 = parseInt($('[name=player3PM7]').val());
    var player3PA7 = parseInt($('[name=player3PA7]').val());
    var player2PM7 = playerFGM7 - player3PM7;
    var player2PA7 = playerFGA7 - player3PA7;
    var playerFTM7 = parseInt($('[name=playerFTM7]').val());
    var playerFTA7 = parseInt($('[name=playerFTA7]').val());
    var playerORB7 = parseInt($('[name=playerORB7]').val());
    var playerDRB7 = parseInt($('[name=playerDRB7]').val());
    var playerREB7 = playerORB7 + playerDRB7;
    var playerPoints7 = parseInt($('[name=playerPoints7]').val());
    var playerAST7 = parseInt($('[name=playerAST7]').val());
    var playerTO7 = parseInt($('[name=playerTO7]').val());
    var playerBLK7 = parseInt($('[name=playerBLK7]').val());
    var playerSTL7 = parseInt($('[name=playerSTL7]').val());
    var playerPF7 = parseInt($('[name=playerPF7]').val());
    var playerMIN7 = parseInt($('[name=playerMIN7]').val());

    if($('.player7').val() != null && $('.player7').val() != ''){
      PlayerStats.insert({
        playerName: playerName7,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter7,
        playerFGM: playerFGM7,
        playerFGA: playerFGA7,
        player3PM: player3PM7,
        player3PA: player3PA7,
        player2PM: player2PM7,
        player2PA: player2PA7,
        playerFTM: playerFTM7,
        playerFTA: playerFTA7,
        playerORB: playerORB7,
        playerDRB: playerDRB7,
        playerREB: playerREB7,
        playerPoints: playerPoints7,
        playerAST: playerAST7,
        playerTO: playerTO7,
        playerBLK: playerBLK7,
        playerSTL: playerSTL7,
        playerPF: playerPF7,
        playerMIN: playerMIN7
      });
    }

    $('.player7').val('');

    var playerName8 = $('[name=playerName8]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter8]').val() === "yes") {
      var playerStarter8 = true;
    } else {
      var playerStarter8 = false;
    }
    var playerFGM8 = parseInt($('[name=playerFGM8]').val());
    var playerFGA8 = parseInt($('[name=playerFGA8]').val());
    var player3PM8 = parseInt($('[name=player3PM8]').val());
    var player3PA8 = parseInt($('[name=player3PA8]').val());
    var player2PM8 = playerFGM8 - player3PM8;
    var player2PA8 = playerFGA8 - player3PA8;
    var playerFTM8 = parseInt($('[name=playerFTM8]').val());
    var playerFTA8 = parseInt($('[name=playerFTA8]').val());
    var playerORB8 = parseInt($('[name=playerORB8]').val());
    var playerDRB8 = parseInt($('[name=playerDRB8]').val());
    var playerREB8 = playerORB8 + playerDRB8;
    var playerPoints8 = parseInt($('[name=playerPoints8]').val());
    var playerAST8 = parseInt($('[name=playerAST8]').val());
    var playerTO8 = parseInt($('[name=playerTO8]').val());
    var playerBLK8 = parseInt($('[name=playerBLK8]').val());
    var playerSTL8 = parseInt($('[name=playerSTL8]').val());
    var playerPF8 = parseInt($('[name=playerPF8]').val());
    var playerMIN8 = parseInt($('[name=playerMIN8]').val());

    if($('.player8').val() != null && $('.player8').val() != ''){
      PlayerStats.insert({
        playerName: playerName8,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter8,
        playerFGM: playerFGM8,
        playerFGA: playerFGA8,
        player3PM: player3PM8,
        player3PA: player3PA8,
        player2PM: player2PM8,
        player2PA: player2PA8,
        playerFTM: playerFTM8,
        playerFTA: playerFTA8,
        playerORB: playerORB8,
        playerDRB: playerDRB8,
        playerREB: playerREB8,
        playerPoints: playerPoints8,
        playerAST: playerAST8,
        playerTO: playerTO8,
        playerBLK: playerBLK8,
        playerSTL: playerSTL8,
        playerPF: playerPF8,
        playerMIN: playerMIN8
      });
    }

    $('.player8').val('');

    var playerName9 = $('[name=playerName9]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter9]').val() === "yes") {
      var playerStarter9 = true;
    } else {
      var playerStarter9 = false;
    }
    var playerFGM9 = parseInt($('[name=playerFGM9]').val());
    var playerFGA9 = parseInt($('[name=playerFGA9]').val());
    var player3PM9 = parseInt($('[name=player3PM9]').val());
    var player3PA9 = parseInt($('[name=player3PA9]').val());
    var player2PM9 = playerFGM9 - player3PM9;
    var player2PA9 = playerFGA9 - player3PA9;
    var playerFTM9 = parseInt($('[name=playerFTM9]').val());
    var playerFTA9 = parseInt($('[name=playerFTA9]').val());
    var playerORB9 = parseInt($('[name=playerORB9]').val());
    var playerDRB9 = parseInt($('[name=playerDRB9]').val());
    var playerREB9 = playerORB9 + playerDRB9;
    var playerPoints9 = parseInt($('[name=playerPoints9]').val());
    var playerAST9 = parseInt($('[name=playerAST9]').val());
    var playerTO9 = parseInt($('[name=playerTO9]').val());
    var playerBLK9 = parseInt($('[name=playerBLK9]').val());
    var playerSTL9 = parseInt($('[name=playerSTL9]').val());
    var playerPF9 = parseInt($('[name=playerPF9]').val());
    var playerMIN9 = parseInt($('[name=playerMIN9]').val());

    if($('.player9').val() != null && $('.player9').val() != ''){
      PlayerStats.insert({
        playerName: playerName9,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter9,
        playerFGM: playerFGM9,
        playerFGA: playerFGA9,
        player3PM: player3PM9,
        player3PA: player3PA9,
        player2PM: player2PM9,
        player2PA: player2PA9,
        playerFTM: playerFTM9,
        playerFTA: playerFTA9,
        playerORB: playerORB9,
        playerDRB: playerDRB9,
        playerREB: playerREB9,
        playerPoints: playerPoints9,
        playerAST: playerAST9,
        playerTO: playerTO9,
        playerBLK: playerBLK9,
        playerSTL: playerSTL9,
        playerPF: playerPF9,
        playerMIN: playerMIN9
      });
    }

    $('.player9').val('');

    var playerName10 = $('[name=playerName10]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter10]').val() === "yes") {
      var playerStarter10 = true;
    } else {
      var playerStarter10 = false;
    }
    var playerFGM10 = parseInt($('[name=playerFGM10]').val());
    var playerFGA10 = parseInt($('[name=playerFGA10]').val());
    var player3PM10 = parseInt($('[name=player3PM10]').val());
    var player3PA10 = parseInt($('[name=player3PA10]').val());
    var player2PM10 = playerFGM10 - player3PM10;
    var player2PA10 = playerFGA10 - player3PA10;
    var playerFTM10 = parseInt($('[name=playerFTM10]').val());
    var playerFTA10 = parseInt($('[name=playerFTA10]').val());
    var playerORB10 = parseInt($('[name=playerORB10]').val());
    var playerDRB10 = parseInt($('[name=playerDRB10]').val());
    var playerREB10 = playerORB10 + playerDRB10;
    var playerPoints10 = parseInt($('[name=playerPoints10]').val());
    var playerAST10 = parseInt($('[name=playerAST10]').val());
    var playerTO10 = parseInt($('[name=playerTO10]').val());
    var playerBLK10 = parseInt($('[name=playerBLK10]').val());
    var playerSTL10 = parseInt($('[name=playerSTL10]').val());
    var playerPF10 = parseInt($('[name=playerPF10]').val());
    var playerMIN10 = parseInt($('[name=playerMIN10]').val());

    if($('.player10').val() != null && $('.player10').val() != ''){
      PlayerStats.insert({
        playerName: playerName10,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter10,
        playerFGM: playerFGM10,
        playerFGA: playerFGA10,
        player3PM: player3PM10,
        player3PA: player3PA10,
        player2PM: player2PM10,
        player2PA: player2PA10,
        playerFTM: playerFTM10,
        playerFTA: playerFTA10,
        playerORB: playerORB10,
        playerDRB: playerDRB10,
        playerREB: playerREB10,
        playerPoints: playerPoints10,
        playerAST: playerAST10,
        playerTO: playerTO10,
        playerBLK: playerBLK10,
        playerSTL: playerSTL10,
        playerPF: playerPF10,
        playerMIN: playerMIN10
      });
    }

    $('.player10').val('');

    var playerName11 = $('[name=playerName11]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter11]').val() === "yes") {
      var playerStarter11 = true;
    } else {
      var playerStarter11 = false;
    }
    var playerFGM11 = parseInt($('[name=playerFGM11]').val());
    var playerFGA11 = parseInt($('[name=playerFGA11]').val());
    var player3PM11 = parseInt($('[name=player3PM11]').val());
    var player3PA11 = parseInt($('[name=player3PA11]').val());
    var player2PM11 = playerFGM11 - player3PM11;
    var player2PA11 = playerFGA11 - player3PA11;
    var playerFTM11 = parseInt($('[name=playerFTM11]').val());
    var playerFTA11 = parseInt($('[name=playerFTA11]').val());
    var playerORB11 = parseInt($('[name=playerORB11]').val());
    var playerDRB11 = parseInt($('[name=playerDRB11]').val());
    var playerREB11 = playerORB11 + playerDRB11;
    var playerPoints11 = parseInt($('[name=playerPoints11]').val());
    var playerAST11 = parseInt($('[name=playerAST11]').val());
    var playerTO11 = parseInt($('[name=playerTO11]').val());
    var playerBLK11 = parseInt($('[name=playerBLK11]').val());
    var playerSTL11 = parseInt($('[name=playerSTL11]').val());
    var playerPF11 = parseInt($('[name=playerPF11]').val());
    var playerMIN11 = parseInt($('[name=playerMIN11]').val());

    if($('.player11').val() != null && $('.player11').val() != ''){
      PlayerStats.insert({
        playerName: playerName11,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter11,
        playerFGM: playerFGM11,
        playerFGA: playerFGA11,
        player3PM: player3PM11,
        player3PA: player3PA11,
        player2PM: player2PM11,
        player2PA: player2PA11,
        playerFTM: playerFTM11,
        playerFTA: playerFTA11,
        playerORB: playerORB11,
        playerDRB: playerDRB11,
        playerREB: playerREB11,
        playerPoints: playerPoints11,
        playerAST: playerAST11,
        playerTO: playerTO11,
        playerBLK: playerBLK11,
        playerSTL: playerSTL11,
        playerPF: playerPF11,
        playerMIN: playerMIN11
      });
    }

    $('.player11').val('');

    var playerName12 = $('[name=playerName12]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter12]').val() === "yes") {
      var playerStarter12 = true;
    } else {
      var playerStarter12 = false;
    }
    var playerFGM12 = parseInt($('[name=playerFGM12]').val());
    var playerFGA12 = parseInt($('[name=playerFGA12]').val());
    var player3PM12 = parseInt($('[name=player3PM12]').val());
    var player3PA12 = parseInt($('[name=player3PA12]').val());
    var player2PM12 = playerFGM12 - player3PM12;
    var player2PA12 = playerFGA12 - player3PA12;
    var playerFTM12 = parseInt($('[name=playerFTM12]').val());
    var playerFTA12 = parseInt($('[name=playerFTA12]').val());
    var playerORB12 = parseInt($('[name=playerORB12]').val());
    var playerDRB12 = parseInt($('[name=playerDRB12]').val());
    var playerREB12 = playerORB12 + playerDRB12;
    var playerPoints12 = parseInt($('[name=playerPoints12]').val());
    var playerAST12 = parseInt($('[name=playerAST12]').val());
    var playerTO12 = parseInt($('[name=playerTO12]').val());
    var playerBLK12 = parseInt($('[name=playerBLK12]').val());
    var playerSTL12 = parseInt($('[name=playerSTL12]').val());
    var playerPF12 = parseInt($('[name=playerPF12]').val());
    var playerMIN12 = parseInt($('[name=playerMIN12]').val());

    if($('.player12').val() != null && $('.player12').val() != ''){
      PlayerStats.insert({
        playerName: playerName12,
        playerDate: date,
        playerOpponent: opponent,
        playerStarter: playerStarter12,
        playerFGM: playerFGM12,
        playerFGA: playerFGA12,
        player3PM: player3PM12,
        player3PA: player3PA12,
        player2PM: player2PM12,
        player2PA: player2PA12,
        playerFTM: playerFTM12,
        playerFTA: playerFTA12,
        playerORB: playerORB12,
        playerDRB: playerDRB12,
        playerREB: playerREB12,
        playerPoints: playerPoints12,
        playerAST: playerAST12,
        playerTO: playerTO12,
        playerBLK: playerBLK12,
        playerSTL: playerSTL12,
        playerPF: playerPF12,
        playerMIN: playerMIN12
      });
    }

    $('.player12').val('');
  }
});
