var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/products');

    $stateProvider

        // home state ========================================
        .state('home', {
            url: '/home',
            controller:'homeCtrl',
            templateUrl: '../views/home.html'
        })

        // products State =================================
        .state('products', {
            url: '/products',
            controller:'productCtrl',
            templateUrl: '../views/product.html'  
        })
    
     // Order state  ========================================
        .state('order', {
            url: '/order',
         controller:'orderCtrl',
            templateUrl: '../views/order.html'
        })
    
      // report state  ========================================
        .state('kitchen', {
            url: '/kitchen-display',
            controller:'kitchenCtrl',
            templateUrl: '../views/kitchen_display.html'
        })
    
      // Order state  ========================================
        .state('report', {
            url: '/report',
            controller:'reportCtrl',
            templateUrl: '../views/report.html'
        });
 

});
