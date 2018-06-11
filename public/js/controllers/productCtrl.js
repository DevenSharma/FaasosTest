app.controller('productCtrl', function($scope,dataFactory) {
     $scope.refreshList=function(){
             dataFactory.getAllProducts()
            .then(function (response) {
                $scope.products = response.data;
             console.log($scope.products);
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
     }
    $scope.refreshList();
    $scope.addProduct=function(){
        var product={};
        product.name=$scope.productName;
          dataFactory.addProduct(product)
            .then(function (response) {               
             console.log($scope.products);
               $scope.refreshList();
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
});