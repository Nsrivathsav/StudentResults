const express = require('express');
const app = express();
const mongoInstance=require('./utils/mongo_init');
const constants = require('./utils/constants');
const studentRouter = require('./routes/student.js');
const dataRouter = require('./routes/data.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/web', express.static(__dirname + '/Client'));


var server = require('http').createServer(app);
server.listen(constants.port);
console.log(`listening at http://localhost:${constants.port}`); 
app.use('/student',studentRouter);
app.use('/data',dataRouter);



app.get('/', function (req, res) {
    mongoInstance.db.collection("StudentData").find().toArray().then(result => {
      res.send(result)
    }).catch(error => {
      console.error("error"+error)
      res.send(error)
    })
});