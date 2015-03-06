pistApp.controller('MainController', ['$scope', '$http', function($scope, $http){
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

	
	
}]);

/*pistApp.directive('btn', function() {
	return {
		link: function (scope, element, attrs) {
			
		}
	}
});*/