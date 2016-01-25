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
    var playerFGM1 = $('[name=playerFGM1]').val();
    var playerFGA1 = $('[name=playerFGA1]').val();
    var player3PM1 = $('[name=player3PM1]').val();
    var player3PA1 = $('[name=player3PA1]').val();
    var player2PM1 = playerFGM1 - player3PM1;
    var player2PA1 = playerFGA1 - player3PA1;
    var playerFTM1 = $('[name=playerFTM1]').val();
    var playerFTA1 = $('[name=playerFTA1]').val();
    var playerORB1 = $('[name=playerORB1]').val();
    var playerDRB1 = $('[name=playerDRB1]').val();
    var playerREB1 = playerORB1 + playerDRB1;
    var playerPoints1 = $('[name=playerPoints1]').val();
    var playerAST1 = $('[name=playerAST1]').val();
    var playerTO1 = $('[name=playerTO]1').val();
    var playerBLK1 = $('[name=playerBLK1]').val();
    var playerSTL1 = $('[name=playerSTL1]').val();
    var playerPF1 = $('[name=playerPF]1').val();
    var playerMIN1 = $('[name=playerMIN1]').val();

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

    var playerName2 = $('[name=playerName2]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter2]').val() === "yes") {
      var playerStarter2 = true;
    } else {
      var playerStarter2 = false;
    }
    var playerFGM2 = $('[name=playerFGM2]').val();
    var playerFGA2 = $('[name=playerFGA2]').val();
    var player3PM2 = $('[name=player3PM2]').val();
    var player3PA2 = $('[name=player3PA2]').val();
    var player2PM2 = playerFGM2 - player3PM2;
    var player2PA2 = playerFGA2 - player3PA2;
    var playerFTM2 = $('[name=playerFTM2]').val();
    var playerFTA2 = $('[name=playerFTA2]').val();
    var playerORB2 = $('[name=playerORB2]').val();
    var playerDRB2 = $('[name=playerDRB2]').val();
    var playerREB2 = playerORB2 + playerDRB2;
    var playerPoints2 = $('[name=playerPoints2]').val();
    var playerAST2 = $('[name=playerAST2]').val();
    var playerTO2 = $('[name=playerTO]2').val();
    var playerBLK2 = $('[name=playerBLK2]').val();
    var playerSTL2 = $('[name=playerSTL2]').val();
    var playerPF2 = $('[name=playerPF]2').val();
    var playerMIN2 = $('[name=playerMIN2]').val();

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

    var playerName3 = $('[name=playerName3]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter3]').val() === "yes") {
      var playerStarter3 = true;
    } else {
      var playerStarter3 = false;
    }
    var playerFGM3 = $('[name=playerFGM3]').val();
    var playerFGA3 = $('[name=playerFGA3]').val();
    var player3PM3 = $('[name=player3PM3]').val();
    var player3PA3 = $('[name=player3PA3]').val();
    var player2PM3 = playerFGM3 - player3PM3;
    var player2PA3 = playerFGA3 - player3PA3;
    var playerFTM3 = $('[name=playerFTM3]').val();
    var playerFTA3 = $('[name=playerFTA3]').val();
    var playerORB3 = $('[name=playerORB3]').val();
    var playerDRB3 = $('[name=playerDRB3]').val();
    var playerREB3 = playerORB3 + playerDRB3;
    var playerPoints3 = $('[name=playerPoints3]').val();
    var playerAST3 = $('[name=playerAST3]').val();
    var playerTO3 = $('[name=playerTO]3').val();
    var playerBLK3 = $('[name=playerBLK3]').val();
    var playerSTL3 = $('[name=playerSTL3]').val();
    var playerPF3 = $('[name=playerPF]3').val();
    var playerMIN3 = $('[name=playerMIN3]').val();

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

    var playerName4 = $('[name=playerName4]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter4]').val() === "yes") {
      var playerStarter4 = true;
    } else {
      var playerStarter4 = false;
    }
    var playerFGM4 = $('[name=playerFGM4]').val();
    var playerFGA4 = $('[name=playerFGA4]').val();
    var player3PM4 = $('[name=player3PM4]').val();
    var player3PA4 = $('[name=player3PA4]').val();
    var player2PM4 = playerFGM4 - player3PM4;
    var player2PA4 = playerFGA4 - player3PA4;
    var playerFTM4 = $('[name=playerFTM4]').val();
    var playerFTA4 = $('[name=playerFTA4]').val();
    var playerORB4 = $('[name=playerORB4]').val();
    var playerDRB4 = $('[name=playerDRB4]').val();
    var playerREB4 = playerORB4 + playerDRB4;
    var playerPoints4 = $('[name=playerPoints4]').val();
    var playerAST4 = $('[name=playerAST4]').val();
    var playerTO4 = $('[name=playerTO]4').val();
    var playerBLK4 = $('[name=playerBLK4]').val();
    var playerSTL4 = $('[name=playerSTL4]').val();
    var playerPF4 = $('[name=playerPF]4').val();
    var playerMIN4 = $('[name=playerMIN4]').val();

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

    var playerName5 = $('[name=playerName5]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter5]').val() === "yes") {
      var playerStarter5 = true;
    } else {
      var playerStarter5 = false;
    }
    var playerFGM5 = $('[name=playerFGM5]').val();
    var playerFGA5 = $('[name=playerFGA5]').val();
    var player3PM5 = $('[name=player3PM5]').val();
    var player3PA5 = $('[name=player3PA5]').val();
    var player2PM5 = playerFGM5 - player3PM5;
    var player2PA5 = playerFGA5 - player3PA5;
    var playerFTM5 = $('[name=playerFTM5]').val();
    var playerFTA5 = $('[name=playerFTA5]').val();
    var playerORB5 = $('[name=playerORB5]').val();
    var playerDRB5 = $('[name=playerDRB5]').val();
    var playerREB5 = playerORB5 + playerDRB5;
    var playerPoints5 = $('[name=playerPoints5]').val();
    var playerAST5 = $('[name=playerAST5]').val();
    var playerTO5 = $('[name=playerTO]5').val();
    var playerBLK5 = $('[name=playerBLK5]').val();
    var playerSTL5 = $('[name=playerSTL5]').val();
    var playerPF5 = $('[name=playerPF]5').val();
    var playerMIN5 = $('[name=playerMIN5]').val();

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

    var playerName6 = $('[name=playerName6]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter6]').val() === "yes") {
      var playerStarter6 = true;
    } else {
      var playerStarter6 = false;
    }
    var playerFGM6 = $('[name=playerFGM6]').val();
    var playerFGA6 = $('[name=playerFGA6]').val();
    var player3PM6 = $('[name=player3PM6]').val();
    var player3PA6 = $('[name=player3PA6]').val();
    var player2PM6 = playerFGM6 - player3PM6;
    var player2PA6 = playerFGA6 - player3PA6;
    var playerFTM6 = $('[name=playerFTM6]').val();
    var playerFTA6 = $('[name=playerFTA6]').val();
    var playerORB6 = $('[name=playerORB6]').val();
    var playerDRB6 = $('[name=playerDRB6]').val();
    var playerREB6 = playerORB6 + playerDRB6;
    var playerPoints6 = $('[name=playerPoints6]').val();
    var playerAST6 = $('[name=playerAST6]').val();
    var playerTO6 = $('[name=playerTO]6').val();
    var playerBLK6 = $('[name=playerBLK6]').val();
    var playerSTL6 = $('[name=playerSTL6]').val();
    var playerPF6 = $('[name=playerPF]6').val();
    var playerMIN6 = $('[name=playerMIN6]').val();

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

    var playerName7 = $('[name=playerName7]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter7]').val() === "yes") {
      var playerStarter7 = true;
    } else {
      var playerStarter7 = false;
    }
    var playerFGM7 = $('[name=playerFGM7]').val();
    var playerFGA7 = $('[name=playerFGA7]').val();
    var player3PM7 = $('[name=player3PM7]').val();
    var player3PA7 = $('[name=player3PA7]').val();
    var player2PM7 = playerFGM7 - player3PM7;
    var player2PA7 = playerFGA7 - player3PA7;
    var playerFTM7 = $('[name=playerFTM7]').val();
    var playerFTA7 = $('[name=playerFTA7]').val();
    var playerORB7 = $('[name=playerORB7]').val();
    var playerDRB7 = $('[name=playerDRB7]').val();
    var playerREB7 = playerORB7 + playerDRB7;
    var playerPoints7 = $('[name=playerPoints7]').val();
    var playerAST7 = $('[name=playerAST7]').val();
    var playerTO7 = $('[name=playerTO]7').val();
    var playerBLK7 = $('[name=playerBLK7]').val();
    var playerSTL7 = $('[name=playerSTL7]').val();
    var playerPF7 = $('[name=playerPF]7').val();
    var playerMIN7 = $('[name=playerMIN7]').val();

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

    var playerName8 = $('[name=playerName8]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter8]').val() === "yes") {
      var playerStarter8 = true;
    } else {
      var playerStarter8 = false;
    }
    var playerFGM8 = $('[name=playerFGM8]').val();
    var playerFGA8 = $('[name=playerFGA8]').val();
    var player3PM8 = $('[name=player3PM8]').val();
    var player3PA8 = $('[name=player3PA8]').val();
    var player2PM8 = playerFGM8 - player3PM8;
    var player2PA8 = playerFGA8 - player3PA8;
    var playerFTM8 = $('[name=playerFTM8]').val();
    var playerFTA8 = $('[name=playerFTA8]').val();
    var playerORB8 = $('[name=playerORB8]').val();
    var playerDRB8 = $('[name=playerDRB8]').val();
    var playerREB8 = playerORB8 + playerDRB8;
    var playerPoints8 = $('[name=playerPoints8]').val();
    var playerAST8 = $('[name=playerAST8]').val();
    var playerTO8 = $('[name=playerTO]8').val();
    var playerBLK8 = $('[name=playerBLK8]').val();
    var playerSTL8 = $('[name=playerSTL8]').val();
    var playerPF8 = $('[name=playerPF]8').val();
    var playerMIN8 = $('[name=playerMIN8]').val();

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

    var playerName9 = $('[name=playerName9]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter9]').val() === "yes") {
      var playerStarter9 = true;
    } else {
      var playerStarter9 = false;
    }
    var playerFGM9 = $('[name=playerFGM9]').val();
    var playerFGA9 = $('[name=playerFGA9]').val();
    var player3PM9 = $('[name=player3PM9]').val();
    var player3PA9 = $('[name=player3PA9]').val();
    var player2PM9 = playerFGM9 - player3PM9;
    var player2PA9 = playerFGA9 - player3PA9;
    var playerFTM9 = $('[name=playerFTM9]').val();
    var playerFTA9 = $('[name=playerFTA9]').val();
    var playerORB9 = $('[name=playerORB9]').val();
    var playerDRB9 = $('[name=playerDRB9]').val();
    var playerREB9 = playerORB9 + playerDRB9;
    var playerPoints9 = $('[name=playerPoints9]').val();
    var playerAST9 = $('[name=playerAST9]').val();
    var playerTO9 = $('[name=playerTO]9').val();
    var playerBLK9 = $('[name=playerBLK9]').val();
    var playerSTL9 = $('[name=playerSTL9]').val();
    var playerPF9 = $('[name=playerPF]9').val();
    var playerMIN9 = $('[name=playerMIN9]').val();

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

    var playerName10 = $('[name=playerName10]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter10]').val() === "yes") {
      var playerStarter10 = true;
    } else {
      var playerStarter10 = false;
    }
    var playerFGM10 = $('[name=playerFGM10]').val();
    var playerFGA10 = $('[name=playerFGA10]').val();
    var player3PM10 = $('[name=player3PM10]').val();
    var player3PA10 = $('[name=player3PA10]').val();
    var player2PM10 = playerFGM10 - player3PM10;
    var player2PA10 = playerFGA10 - player3PA10;
    var playerFTM10 = $('[name=playerFTM10]').val();
    var playerFTA10 = $('[name=playerFTA10]').val();
    var playerORB10 = $('[name=playerORB10]').val();
    var playerDRB10 = $('[name=playerDRB10]').val();
    var playerREB10 = playerORB10 + playerDRB10;
    var playerPoints10 = $('[name=playerPoints10]').val();
    var playerAST10 = $('[name=playerAST10]').val();
    var playerTO10 = $('[name=playerTO]10').val();
    var playerBLK10 = $('[name=playerBLK10]').val();
    var playerSTL10 = $('[name=playerSTL10]').val();
    var playerPF10 = $('[name=playerPF]10').val();
    var playerMIN10 = $('[name=playerMIN10]').val();

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

    var playerName11 = $('[name=playerName11]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter11]').val() === "yes") {
      var playerStarter11 = true;
    } else {
      var playerStarter11 = false;
    }
    var playerFGM11 = $('[name=playerFGM11]').val();
    var playerFGA11 = $('[name=playerFGA11]').val();
    var player3PM11 = $('[name=player3PM11]').val();
    var player3PA11 = $('[name=player3PA11]').val();
    var player2PM11 = playerFGM11 - player3PM11;
    var player2PA11 = playerFGA11 - player3PA11;
    var playerFTM11 = $('[name=playerFTM11]').val();
    var playerFTA11 = $('[name=playerFTA11]').val();
    var playerORB11 = $('[name=playerORB11]').val();
    var playerDRB11 = $('[name=playerDRB11]').val();
    var playerREB11 = playerORB11 + playerDRB11;
    var playerPoints11 = $('[name=playerPoints11]').val();
    var playerAST11 = $('[name=playerAST11]').val();
    var playerTO11 = $('[name=playerTO]11').val();
    var playerBLK11 = $('[name=playerBLK11]').val();
    var playerSTL11 = $('[name=playerSTL11]').val();
    var playerPF11 = $('[name=playerPF]11').val();
    var playerMIN11 = $('[name=playerMIN11]').val();

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

    var playerName12 = $('[name=playerName12]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter12]').val() === "yes") {
      var playerStarter12 = true;
    } else {
      var playerStarter12 = false;
    }
    var playerFGM12 = $('[name=playerFGM12]').val();
    var playerFGA12 = $('[name=playerFGA12]').val();
    var player3PM12 = $('[name=player3PM12]').val();
    var player3PA12 = $('[name=player3PA12]').val();
    var player2PM12 = playerFGM12 - player3PM12;
    var player2PA12 = playerFGA12 - player3PA12;
    var playerFTM12 = $('[name=playerFTM12]').val();
    var playerFTA12 = $('[name=playerFTA12]').val();
    var playerORB12 = $('[name=playerORB12]').val();
    var playerDRB12 = $('[name=playerDRB12]').val();
    var playerREB12 = playerORB12 + playerDRB12;
    var playerPoints12 = $('[name=playerPoints12]').val();
    var playerAST12 = $('[name=playerAST12]').val();
    var playerTO12 = $('[name=playerTO]12').val();
    var playerBLK12 = $('[name=playerBLK12]').val();
    var playerSTL12 = $('[name=playerSTL12]').val();
    var playerPF12 = $('[name=playerPF]12').val();
    var playerMIN12 = $('[name=playerMIN12]').val();

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
  }
});
