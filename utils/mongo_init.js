let mongodb = require('mongodb');
const constants = require('./constants');
const MongoClient = require("mongodb").MongoClient;

var mongoInstance={};
MongoClient.connect(constants.dbConnectionUri, { useUnifiedTopology: true },function(err, db) {
    mongoInstance.db = db.db("StudentDB"); 
    console.log("mongoInstance Connected");
});

module.exports=mongoInstance;
      