app.factory('dataFactory', ['$http', function($http) {

    var urlBase = '/';
    var dataFactory = {};

    dataFactory.getAllProducts = function () {
        return $http.get('/getAllProducts');
    };

    dataFactory.getCustomer = function () {
        return $http.get('/getAllProducts');
    };
    
    dataFactory.getReports = function () {
        return $http.get('/report');
    };
    
    dataFactory.display = function () {
        return $http.get('/display');
    };
    
     dataFactory.done = function (order) {      
        return $http.post('/done', order);
    };
    
    dataFactory.getAllOrder = function () {
        return $http.get('/order');
    };
    
    dataFactory.placeOrder = function (order) {
        console.log(order);
        return $http.post('/order', order);
    };
    
    dataFactory.addProduct = function (products) {
        console.log(products);
        return $http.post('add', product);
    };
    
    dataFactory.createPrediction = function (prediction) {
               return $http.post('predict', prediction);
    };
    
    dataFactory.updateProduct = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };
  
    return dataFactory;
}]);