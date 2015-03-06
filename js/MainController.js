pistApp.controller('MainController', ['$scope', '$http', function($scope, $http){
	var jours = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	$scope.days = [];
	var tabTemp = [];
	$scope.temp = null;
	
	$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7')
		.then(function(result) {
			var list = result.data.list;
			list.forEach(function(element){
				var dateObject = new Date(element.dt * 1000);
				var dateReadable = jours[dateObject.getDay()]+' '+dateObject.getDate();
				$scope.days.push(dateReadable);
				var tabTemp.push(Math.floor(element.temp.day));
				
			});
	
	
	}
	$scope.nextDay = function (index) {
		//$scope.days.push(index);
		$scope.temp = tabTemp[index];
		});	
	
}]);

/*pistApp.directive('btn', function() {
	return {
		link: function (scope, element, attrs) {
			
		}
	}
});*/