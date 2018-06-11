app.controller('orderCtrl', function($scope,dataFactory) {
    $scope.refreshList=function(){
    dataFactory.getAllOrder()
            .then(function (response) {
                $scope.orders = response.data;
             console.log($scope.products);
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    $scope.refreshList();
    
    //get all products
      dataFactory.getAllProducts()
            .then(function (response) {
                $scope.products = response.data;
             console.log($scope.products);
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    
    // place order function
    $scope.placeOrder=function(){
         var order={};
        order.quantity=$scope.productQuantity;
        order.pid=$scope.productId;        
          dataFactory.placeOrder(order)
            .then(function (response) {               
           alert(response.data.message);
              
              $scope.refreshList();
         }, function (error) {
              
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    
     // place order function
    $scope.createPrediction=function(){
         var prediction={};
        prediction.predicted=$scope.predictQuantity;
        prediction.pid=$scope.predictProduct;   
        console.log(prediction);
          dataFactory.createPrediction(prediction)
            .then(function (response) {               
           alert(response.data.message);
         }, function (error) {
              
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
});