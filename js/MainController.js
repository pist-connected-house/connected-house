pistApp.controller('MainController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
	var jours = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	$scope.days = [];
	$scope.temp = [];
	$scope.icon = [];
	$scope.ready = false;
	
	$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7')
		.then(function(result) {
			var list = result.data.list;
			list.forEach(function(element){
				$scope.icon.push({image:element.weather[0].icon, alt:element.weather[0].main, title:element.weather[0].description});
				var dateObject = new Date(element.dt * 1000);
				var dateReadable = jours[dateObject.getDay()]+' '+dateObject.getDate();
				$scope.days.push(dateReadable);
				$scope.temp.push(Math.floor(element.temp.day));
			});
			$scope.ready = true;
	
	});
	
	function control(){
	$http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')

		.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temperature = Math.floor(feed.field1);
		$scope.hygrometry = Math.floor(feed.field2);
		$scope.pressure = Math.floor(feed.field3);
		$scope.wind = Math.floor(feed.field4);
		$scope.pluviometry = Math.floor(feed.field5);
		console.log(result);
			
	});
	};
	
	$interval(control(), 20000);

	
}]);

/*pistApp.directive('btn', function() {
	return {
		link: function (scope, element, attrs) {
			
		}
	}
});*/