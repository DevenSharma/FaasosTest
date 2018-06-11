app.controller('homeCtrl', function($scope,dataFactory) {  
      var socket = io('http://localhost:3000');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
     dataFactory.getCustomers()
            .then(function (response) {
                $scope.customers = response.data;        
                console.log($scope.customers);
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    

});