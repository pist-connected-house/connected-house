pistApp.controller('WeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
	function control(){
	$http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')

		.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temp = Math.floor(feed.field1);
		$scope.hygrometry = Math.floor(feed.field2);
		$scope.pressure = Math.floor(feed.field3);
		$scope.wind = Math.floor(feed.field4);
		$scope.pluviometry = Math.floor(feed.field5);
		console.log(result);
			
	});
	};
	
	$interval(control(), 20000);

}]);