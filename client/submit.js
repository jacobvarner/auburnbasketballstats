Session.set('category', "Points");
Session.set('duration', "Career");

Router.route('/submit', {
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4" || currentUser == "BsGLSHNC3hPpEfBH3") {
      this.next();
    } else {
      this.render('login');
    }
  }
});

Router.route('/submit/team', {
  name: 'teamInput',
  template: 'teamInput',
  subscriptions: function() {
    Meteor.subscribe('roster');
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4" || currentUser == "BsGLSHNC3hPpEfBH3") {
      this.next();
    } else {
      this.render('login');
    }
  }
});
Router.route('/submit/game', {
  name: 'statsInput',
  template: 'statsInput',
  subscriptions: function() {
    Meteor.subscribe('player');
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4" || currentUser == "BsGLSHNC3hPpEfBH3") {
      this.next();
    } else {
      this.render('login');
    }
  }
});
Router.route('/submit/records', {
  name: 'recordInput',
  template: 'recordInput',
  subscriptions: function() {
    Meteor.subscribe('records');
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4" || currentUser == "BsGLSHNC3hPpEfBH3") {
      this.next();
    } else {
      this.render('login');
    }
  }
});
Router.route('/submit/season', {
  name: 'seasonInput',
  template: 'seasonInput',
  subscriptions: function() {
    Meteor.subscribe('season');
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "tFshn3W287dh68DdS" || currentUser == "kecEwKrgveYfHNXL4" || currentUser == "BsGLSHNC3hPpEfBH3") {
      this.next();
    } else {
      this.render('login');
    }
  }
});

Template.teamInput.events({
  'submit form': function(event){
    event.preventDefault();

    var season = $('[name=season]').val();
    var name = $('[name=name]').val();
    var number = parseInt($('[name=number]').val());
    var position = $('[name=position]').val();
    var height = $('[name=height]').val();
    var weight = $('[name=weight]').val();
    var classYear = $('[name=class]').val();
    var scholarship = $('[name=scholarship]').is(":checked");
    var transfer = $('[name=transfer]').is(":checked");
    var hometown = $('[name=hometown]').val();
    var lastSchool = $('[name=lastSchool]').val();

    Meteor.call('addPlayer', season, name, number, position, height, weight, classYear, scholarship, transfer, hometown, lastSchool);

    $('[name=season]').val('');
    $('[name=name]').val('');
    $('[name=number]').val('');
    $('[name=position]').val('');
    $('[name=height]').val('');
    $('[name=weight]').val('');
    $('[name=class]').val('');
    $('[name=scholarship]').prop("checked", false);
    $('[name=transfer]').prop("checked", false);
    $('[name=hometown]').val('');
    $('[name=lastSchool]').val('');
  },
  'click .delete': function(event){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this player?");
    if(confirm){
      Meteor.call('deletePlayer', documentId);
    }
  }
});

Template.teamInput.helpers({
  'seasonList': function() {
    var seasons = PlayerInfo.find({}, {sort: {season: -1}}).fetch();
    seasons = _.pluck(seasons, 'season');
    var uniqueSeasons = _.uniq(seasons, true);
    return uniqueSeasons;
  },
  'getRoster': function() {
    var season = Session.get('rosterSeason');
    var roster = PlayerInfo.find({season: season}, {sort: {number: 1}}).fetch();
    return roster;
  }
});

Template.teamInput.events({
  "change #season-select": function() {
    Session.set('rosterSeason', $('#season-select').val());
  }
});

Template.recordInput.events({
  'change .category': function() {
    var category = $('.category').val();
    Session.set('category', category);
  },
  'change .duration': function() {
    var duration = $('.duration').val();
    Session.set('duration', duration);
  },
  'submit form': function(event) {
    event.preventDefault();

    var category = $('.category').val();
    var duration = $('.duration').val();
    var rank = parseInt($('[name=rank]').val());
    var player = $('[name=player]').val();
    var season = $('[name=season]').val();
    var value = $('[name=value]').val();

    Meteor.call('addRecord', category, duration, rank, player, season, value);

    $('[name=rank]').val('');
    $('[name=player]').val('');
    $('[name=season]').val('');
    $('[name=value]').val('');
  },
  'click .delete': function(event){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this record?");
    if(confirm){
      Meteor.call('deleteRecord', documentId);
    }
  }
});

Template.recordInput.helpers({
  'recordTitle': function() {
    var category = Session.get('category');
    var duration = Session.get('duration');
    var output = duration + " " + category;
    return output;
  },
  'recordTable': function() {
    var category = Session.get('category');
    var duration = Session.get('duration');
    var output = RecordInfo.find({ category: category, duration: duration}, {sort: {rank: 1 }}).fetch();
    return output;
  }
});

Template.seasonInput.events({
  'submit form': function(event) {
    event.preventDefault();

    var season = $('[name=season]').val();
    Session.set('season', season);

    var date = new Date($('[name=date]').val());
    var opponent = $('[name=opponent]').val();
    var oppRank = parseInt($('[name=oppRank]').val());
    var auRank = parseInt($('[name=auRank]').val());
    var location = $('[name=location]').val();
    var auScore = parseInt($('[name=auScore]').val());
    var oppScore = parseInt($('[name=oppScore]').val());
    if (auScore > oppScore) {
      var result = "W";
    } else if (auScore < oppScore) {
      var result = "L";
    } else {
      var result = "T";
    }
    var ot = $('[name=ot]').val();
    var conference = $('[name=conference]').is(':checked');
    var confTourney = $('[name=confTourney]').is(':checked');
    var nit = $('[name=nit]').is(':checked');
    var ncaa = $('[name=ncaa]').is(':checked');

    Meteor.call('addGame', season, date, opponent, oppRank, auRank, location, auScore, oppScore, result, ot, conference, confTourney, nit, ncaa);

    $('[name=date]').val('');
    $('[name=opponent]').val('');
    $('[name=oppRank]').val('');
    $('[name=auRank]').val('');
    $('[name=location]').val('');
    $('[name=auScore]').val('');
    $('[name=oppScore]').val('');
    $('[name=ot]').val('');
    $('[name=conference]').val('');
    $('[name=confTourney]').val('');
    $('[name=nit]').val('');
    $('[name=ncaa]').val('');
  }
});

Template.seasonInput.helpers({
  'display': function(){
    var season = Session.get('season');
    var output = SeasonInfo.find({ season: season }, {sort: {date: 1}}).fetch();
    return output;
  },
  'year': function() {
    return Session.get('season');
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
  }
});

Template.statsInput.events({
  'submit form': function(event){
    event.preventDefault();

    var season = $('[name=season]').val();
    var opponent = $('[name=opponent]').val();
    var date = new Date($('[name=date]').val());
    var location = $('[name=location]').val();
    var attendance = parseInt($('[name=gameAttendance]').val());

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
      Meteor.call('addGameStats', season, opponent, date, location, attendance, auburnFGM, auburnFGA, auburn3PM, auburn3PA, auburn2PM, auburn2PA, auburnFTM, auburnFTA, auburnORB, auburnDRB, auburnREB, auburnPoints, auburnAST, auburnTO, auburnBLK, auburnSTL, auburnPF, auburnMIN, auburnPOT, auburnPIP, auburn2CP, auburnFBP, auburnBP, opponentFGM, opponentFGA, opponent3PM, opponent3PA, opponent2PM, opponent2PA, opponentFTM, opponentFTA, opponentORB, opponentDRB, opponentREB, opponentPoints, opponentAST, opponentTO, opponentBLK, opponentSTL, opponentPF, opponentMIN, opponentPOT, opponentPIP, opponent2CP, opponentFBP, opponentBP);
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
    var playerSeason = season;
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
      Meteor.call('addPlayerStats', playerName1, date, season, opponent, playerStarter1, playerFGM1, playerFGA1, player3PM1, player3PA1, player2PM1, player2PA1, playerFTM1, playerFTA1, playerORB1, playerDRB1, playerREB1, playerPoints1, playerAST1, playerTO1, playerBLK1, playerSTL1, playerPF1, playerMIN1);
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
      Meteor.call('addPlayerStats', playerName2, date, season, opponent, playerStarter2, playerFGM2, playerFGA2, player3PM2, player3PA2, player2PM2, player2PA2, playerFTM2, playerFTA2, playerORB2, playerDRB2, playerREB2, playerPoints2, playerAST2, playerTO2, playerBLK2, playerSTL2, playerPF2, playerMIN2);
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
      Meteor.call('addPlayerStats', playerName3, date, season, opponent, playerStarter3, playerFGM3, playerFGA3, player3PM3, player3PA3, player2PM3, player2PA3, playerFTM3, playerFTA3, playerORB3, playerDRB3, playerREB3, playerPoints3, playerAST3, playerTO3, playerBLK3, playerSTL3, playerPF3, playerMIN3);
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
      Meteor.call('addPlayerStats', playerName4, date, season, opponent, playerStarter4, playerFGM4, playerFGA4, player3PM4, player3PA4, player2PM4, player2PA4, playerFTM4, playerFTA4, playerORB4, playerDRB4, playerREB4, playerPoints4, playerAST4, playerTO4, playerBLK4, playerSTL4, playerPF4, playerMIN4);
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
      Meteor.call('addPlayerStats', playerName5, date, season, opponent, playerStarter5, playerFGM5, playerFGA5, player3PM5, player3PA5, player2PM5, player2PA5, playerFTM5, playerFTA5, playerORB5, playerDRB5, playerREB5, playerPoints5, playerAST5, playerTO5, playerBLK5, playerSTL5, playerPF5, playerMIN5);
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
      Meteor.call('addPlayerStats', playerName6, date, season, opponent, playerStarter6, playerFGM6, playerFGA6, player3PM6, player3PA6, player2PM6, player2PA6, playerFTM6, playerFTA6, playerORB6, playerDRB6, playerREB6, playerPoints6, playerAST6, playerTO6, playerBLK6, playerSTL6, playerPF6, playerMIN6);
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
      Meteor.call('addPlayerStats', playerName7, date, season, opponent, playerStarter7, playerFGM7, playerFGA7, player3PM7, player3PA7, player2PM7, player2PA7, playerFTM7, playerFTA7, playerORB7, playerDRB7, playerREB7, playerPoints7, playerAST7, playerTO7, playerBLK7, playerSTL7, playerPF7, playerMIN7);
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
      Meteor.call('addPlayerStats', playerName8, date, season, opponent, playerStarter8, playerFGM8, playerFGA8, player3PM8, player3PA8, player2PM8, player2PA8, playerFTM8, playerFTA8, playerORB8, playerDRB8, playerREB8, playerPoints8, playerAST8, playerTO8, playerBLK8, playerSTL8, playerPF8, playerMIN8);
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
      Meteor.call('addPlayerStats', playerName9, date, season, opponent, playerStarter9, playerFGM9, playerFGA9, player3PM9, player3PA9, player2PM9, player2PA9, playerFTM9, playerFTA9, playerORB9, playerDRB9, playerREB9, playerPoints9, playerAST9, playerTO9, playerBLK9, playerSTL9, playerPF9, playerMIN9);
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
      Meteor.call('addPlayerStats', playerName10, date, season, opponent, playerStarter10, playerFGM10, playerFGA10, player3PM10, player3PA10, player2PM10, player2PA10, playerFTM10, playerFTA10, playerORB10, playerDRB10, playerREB10, playerPoints10, playerAST10, playerTO10, playerBLK10, playerSTL10, playerPF10, playerMIN10);
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
      Meteor.call('addPlayerStats', playerName11, date, season, opponent, playerStarter11, playerFGM11, playerFGA11, player3PM11, player3PA11, player2PM11, player2PA11, playerFTM11, playerFTA11, playerORB11, playerDRB11, playerREB11, playerPoints11, playerAST11, playerTO11, playerBLK11, playerSTL11, playerPF11, playerMIN11);
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
      Meteor.call('addPlayerStats', playerName12, date, season, opponent, playerStarter12, playerFGM12, playerFGA12, player3PM12, player3PA12, player2PM12, player2PA12, playerFTM12, playerFTA12, playerORB12, playerDRB12, playerREB12, playerPoints12, playerAST12, playerTO12, playerBLK12, playerSTL12, playerPF12, playerMIN12);
    }

    $('.player12').val('');

    var playerName13 = $('[name=playerName13]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter13]').val() === "yes") {
      var playerStarter13 = true;
    } else {
      var playerStarter13 = false;
    }
    var playerFGM13 = parseInt($('[name=playerFGM13]').val());
    var playerFGA13 = parseInt($('[name=playerFGA13]').val());
    var player3PM13 = parseInt($('[name=player3PM13]').val());
    var player3PA13 = parseInt($('[name=player3PA13]').val());
    var player2PM13 = playerFGM13 - player3PM13;
    var player2PA13 = playerFGA13 - player3PA13;
    var playerFTM13 = parseInt($('[name=playerFTM13]').val());
    var playerFTA13 = parseInt($('[name=playerFTA13]').val());
    var playerORB13 = parseInt($('[name=playerORB13]').val());
    var playerDRB13 = parseInt($('[name=playerDRB13]').val());
    var playerREB13 = playerORB13 + playerDRB13;
    var playerPoints13 = parseInt($('[name=playerPoints13]').val());
    var playerAST13 = parseInt($('[name=playerAST13]').val());
    var playerTO13 = parseInt($('[name=playerTO13]').val());
    var playerBLK13 = parseInt($('[name=playerBLK13]').val());
    var playerSTL13 = parseInt($('[name=playerSTL13]').val());
    var playerPF13 = parseInt($('[name=playerPF13]').val());
    var playerMIN13 = parseInt($('[name=playerMIN13]').val());

    if($('.player13').val() != null && $('.player13').val() != ''){
      Meteor.call('addPlayerStats', playerName13, date, season, opponent, playerStarter13, playerFGM13, playerFGA13, player3PM13, player3PA13, player2PM13, player2PA13, playerFTM13, playerFTA13, playerORB13, playerDRB13, playerREB13, playerPoints13, playerAST13, playerTO13, playerBLK13, playerSTL13, playerPF13, playerMIN13);
    }

    $('.player13').val('');

    var playerName14 = $('[name=playerName14]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter14]').val() === "yes") {
      var playerStarter14 = true;
    } else {
      var playerStarter14 = false;
    }
    var playerFGM14 = parseInt($('[name=playerFGM14]').val());
    var playerFGA14 = parseInt($('[name=playerFGA14]').val());
    var player3PM14 = parseInt($('[name=player3PM14]').val());
    var player3PA14 = parseInt($('[name=player3PA14]').val());
    var player2PM14 = playerFGM14 - player3PM14;
    var player2PA14 = playerFGA14 - player3PA14;
    var playerFTM14 = parseInt($('[name=playerFTM14]').val());
    var playerFTA14 = parseInt($('[name=playerFTA14]').val());
    var playerORB14 = parseInt($('[name=playerORB14]').val());
    var playerDRB14 = parseInt($('[name=playerDRB14]').val());
    var playerREB14 = playerORB14 + playerDRB14;
    var playerPoints14 = parseInt($('[name=playerPoints14]').val());
    var playerAST14 = parseInt($('[name=playerAST14]').val());
    var playerTO14 = parseInt($('[name=playerTO14]').val());
    var playerBLK14 = parseInt($('[name=playerBLK14]').val());
    var playerSTL14 = parseInt($('[name=playerSTL14]').val());
    var playerPF14 = parseInt($('[name=playerPF14]').val());
    var playerMIN14 = parseInt($('[name=playerMIN14]').val());

    if($('.player14').val() != null && $('.player14').val() != ''){
      Meteor.call('addPlayerStats', playerName14, date, season, opponent, playerStarter14, playerFGM14, playerFGA14, player3PM14, player3PA14, player2PM14, player2PA14, playerFTM14, playerFTA14, playerORB14, playerDRB14, playerREB14, playerPoints14, playerAST14, playerTO14, playerBLK14, playerSTL14, playerPF14, playerMIN14);
    }

    $('.player14').val('');

    var playerName15 = $('[name=playerName15]').val();
    var playerDate = date;
    var playerOpponent = opponent;
    if($('[name=playerStarter15]').val() === "yes") {
      var playerStarter15 = true;
    } else {
      var playerStarter15 = false;
    }
    var playerFGM15 = parseInt($('[name=playerFGM15]').val());
    var playerFGA15 = parseInt($('[name=playerFGA15]').val());
    var player3PM15 = parseInt($('[name=player3PM15]').val());
    var player3PA15 = parseInt($('[name=player3PA15]').val());
    var player2PM15 = playerFGM15 - player3PM15;
    var player2PA15 = playerFGA15 - player3PA15;
    var playerFTM15 = parseInt($('[name=playerFTM15]').val());
    var playerFTA15 = parseInt($('[name=playerFTA15]').val());
    var playerORB15 = parseInt($('[name=playerORB15]').val());
    var playerDRB15 = parseInt($('[name=playerDRB15]').val());
    var playerREB15 = playerORB15 + playerDRB15;
    var playerPoints15 = parseInt($('[name=playerPoints15]').val());
    var playerAST15 = parseInt($('[name=playerAST15]').val());
    var playerTO15 = parseInt($('[name=playerTO15]').val());
    var playerBLK15 = parseInt($('[name=playerBLK15]').val());
    var playerSTL15 = parseInt($('[name=playerSTL15]').val());
    var playerPF15 = parseInt($('[name=playerPF15]').val());
    var playerMIN15 = parseInt($('[name=playerMIN15]').val());

    if($('.player15').val() != null && $('.player15').val() != ''){
      Meteor.call('addPlayerStats', playerName15, date, season, opponent, playerStarter15, playerFGM15, playerFGA15, player3PM15, player3PA15, player2PM15, player2PA15, playerFTM15, playerFTA15, playerORB15, playerDRB15, playerREB15, playerPoints15, playerAST15, playerTO15, playerBLK15, playerSTL15, playerPF15, playerMIN15);
    }

    $('.player15').val('');
  }
});
