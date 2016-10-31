GameStats = new Mongo.Collection('gameStats');
PlayerStats = new Mongo.Collection('playerStats');
PlayerInfo = new Mongo.Collection('playerInfo');
RecordInfo = new Mongo.Collection('recordInfo');
SeasonInfo = new Mongo.Collection('seasonInfo');

PlayerStats.allow({
  remove: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  update: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  insert: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
});

GameStats.allow({
  remove: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  update: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  insert: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
});

PlayerInfo.allow({
  remove: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  update: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  insert: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
});

RecordInfo.allow({
  remove: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  update: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  insert: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
});

SeasonInfo.allow({
  remove: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  update: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
  insert: function(userId) {
    if (userId == "tFshn3W287dh68DdS" || userId == "kecEwKrgveYfHNXL4" || userId == "BsGLSHNC3hPpEfBH3") {
      output = true;
    } else {
      output = false;
    }
    return output;
  },
});
