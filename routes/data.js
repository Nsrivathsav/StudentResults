const dataRouter = require('express').Router()
const mongoInstance=require('../utils/mongo_init');


dataRouter.post('/upload', function (req, res) {
    if(!req.query.data || req.query.data.length==0){
        res.send("Invalid Data");
    }
    else{
        var data=[];
        req.query.data.forEach(record => {
            record=JSON.parse(record);
            var studentRecord={};
            studentRecord.filter={id:record.ID};
            studentRecord.upsert=true;
            studentRecord.update={$set:record};
            data.push({updateOne:studentRecord});
        });
        mongoInstance.db.collection("StudentData").bulkWrite(data).then(result => {
            if(result)
                res.send("Success");
            })
            .catch(error => {
                res.send("Error occured during upload");
        });  
        
       
    }   
});

module.exports = dataRouter