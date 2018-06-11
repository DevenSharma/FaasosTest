app.controller('reportCtrl', function($scope,dataFactory) {
         dataFactory.getReports()
            .then(function (response) {
                $scope.report = response.data;
             console.log($scope.report);
         }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
});