app.controller('kitchenCtrl', function($scope,dataFactory) {
       $scope.refreshList=function(){
             dataFactory.display()
            .then(function (response) {
               $scope.display=response.data;
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
       }
     $scope.refreshList();
     var socket = io('http://localhost:3000');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
            
        });
    
    $scope.done=function(id){
        var data={};
        data._id=id;
          dataFactory.done(data)
            .then(function (response) {
               $scope.refreshList();
               console.log(response.data);
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
});