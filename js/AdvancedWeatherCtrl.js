pistApp.controller('AdvancedWeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
    $scope.control = function(){
    $scope.dewpoint =Math.floor(3*5);
    }
    $scope.control();
    }]);
    