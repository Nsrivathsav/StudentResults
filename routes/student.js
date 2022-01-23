const studentRouter = require('express').Router()
const mongoInstance=require('../utils/mongo_init');


studentRouter.get('/:id/result', function (req, res) {
    mongoInstance.db.collection("StudentData").findOne({ID:req.params.id}).then(result => {
      if(result!=null){
        if(result.MARK1>=35 && result.MARK2>=35  && result.MARK3>=35)
        {
          res.send("Passed with score "+(parseInt(result.MARK1)+parseInt(result.MARK2)+parseInt(result.MARK3)));
        }else{
          res.send("Failed with score "+(parseInt(result.MARK1)+parseInt(result.MARK2)+parseInt(result.MARK3)));
        }
      }else{
        res.send("Invalid ID");
      }
    }).catch(error => {
      console.error("error"+error)
      res.send(error)
    })
});



studentRouter.get('/', function (req, res) {
  var status=req.query.resultStatus;
  var data=[];
  mongoInstance.db.collection("StudentData").find().toArray().then(result => {
      if(status=='passed'){
        result.forEach(element => {
          if(element.MARK1>=35 && element.MARK2>=35  && element.MARK3>=35){
            data.push(element.NAME);
          }
        });
      }else{
        result.forEach(element => {
          if(element.MARK1<35 || element.MARK2<35  || element.MARK3<35){
            data.push(element.NAME);
          }
        });
      }
    res.send(data);
  }).catch(error => {
    console.error("error"+error)
    res.send(error)
  })
});

module.exports = studentRouter