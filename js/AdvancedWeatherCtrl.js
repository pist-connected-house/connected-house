pistApp.controller('AdvancedWeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
    $scope.control = function(){
        $http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')
	.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temp = parseFloat(feed.field2).toFixed(1);
		$scope.humidity = Math.floor(feed.field3);
		$scope.direction = Math.floor(feed.field7);
        $scope.speed = Math.floor(feed.field8);
   
    });
          };
    $scope.control2 = function(){
     $scope.dewpoint =Math.floor(($scope.temp)*5);
    };
          
    $scope.control();
    $scope.control2();
    }]);
    