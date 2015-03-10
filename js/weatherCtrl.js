pistApp.controller('WeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
	$scope.control = function(){
	$http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')
	.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temp = Math.floor(feed.field2);
		$scope.humidity = Math.floor(feed.field3);
		$scope.direction = Math.floor(feed.field7);
        $scope.speed = Math.floor(feed.field8);
		$scope.pluviometry = Math.floor(feed.field4);
        $scope.pressure = Math.floor(feed.field1/100);
        $scope.luminosity = Math.floor(feed.field5);
        	
		});
<<<<<<< HEAD
     };
=======
	};
	
	$scope.control2=function(){
	$http.get('http://kgb.emn.fr:8001/channels/4/field/1.json?key=94BREBU27ZFTXJ38&results=1')
	.then(function(result){
		var feed = result.data.feeds[0];
		var inter = feed.field1;
		if(inter == null)
			$scope.control2();
		else
			$scope.inside = Math.floor(inter);
		});
	};
>>>>>>> origin/master
	$scope.control();
	$scope.control2();
	
	var intervalTempInt = $interval($scope.control, 10000);
	var intervalReste= $interval($scope.control2, 10000);


  $scope.$on('$destroy', function () { 
    $interval.cancel(intervalTempInt); 
    $interval.cancel(intervalReste); 
  });

}]);