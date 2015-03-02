pistApp.controller('ForecastController', ['$scope', '$http', function($scope, $http){
	var jours = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	$scope.days = [];
	$scope.temp = [];
	$scope.image = [];
	$scope.weather = [];
	$scope.wind = [];
	$scope.ready = false;

	$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7')
		.then(function(result) {
			var list = result.data.list;
			list.forEach(function(element){
				var dateObject = new Date(element.dt * 1000);
				var dateReadable = jours[dateObject.getDay()]+' '+dateObject.getDate();
				$scope.days.push(dateReadable);
				$scope.temp.push({morn: Math.floor(element.temp.morn), eve: Math.floor(element.temp.eve)});
				$scope.image.push(element.weather[0].icon);
				$scope.weather.push(element.weather[0].description);
				$scope.wind.push(Math.floor(element.speed));
			});
			$scope.ready = true;
		});
	
}]);