pistApp.controller('ForecastController', ['$scope', '$http', function($scope, $http){
	var jours = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	$scope.ready = true;
	$scope.errors = false;

	$scope.submitCity = function() {
		$scope.days = [];
		$scope.temp = [];
		$scope.image = [];
		$scope.weather = [];
		$scope.wind = [];
		$scope.ready = false;
		$scope.errors = false;
		$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.city+',FR&mode=json&units=metric&cnt=7&APPID='+APIKEYOPENWEATHER)
		.then(function(result) {
			if (result.data.cod === "200") {
				var list = result.data.list;
				$scope.city = result.data.city.name;
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
			}
			else {
				$scope.errorCity = $scope.city;
				$scope.errors = true;
			}
		});
	};

	
	
}]);