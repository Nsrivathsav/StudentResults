var StudentApplication = angular.module("StudentApplication",[]);
StudentApplication.controller('uploadCntrl', ['$scope','$http',function($scope,$http){

    $scope.uploadData=function(){
        var filename = document.getElementById("readCsvFile");
        if (filename.value.length < 1 ){
            $scope.warning = "Please upload a file";
        } else {
            var file = filename.files[0];
            var reader = new FileReader();
            var data=[];
            reader.readAsText(filename.files[0]);
            reader.onload = function (e) {
                var rows = e.target.result.split("\n");
                var headers=rows[0].split(",");
                for (var i = 1; i < rows.length; i++) {
                    var row = {};
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {  
                        row[headers[j].split("\r")[0]]=cells[j].split("\r")[0];
                    }
                    data.push(row);
                }
                var param = {
                    data: data
                };
                $http({
                    method: "POST",
                    url: 'http://localhost:8000/data/upload',
                    params:param
                }).then(function mySuccess(result) {
                    if(result.status==200 && result.data=='Success'){
                        alert("Upload Success");
                    }else{
                        alert("Upload Failed");
                    }
                });

            }
        }
    }
}]);

