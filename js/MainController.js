pistApp.controller('MainController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
	var jours = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	$scope.load = true;
	$scope.ready = false;
	$scope.input = true;
	$scope.errors = false;
	
	$scope.submitCity = function() {
		$scope.days = [];
		$scope.temperature = [];
		$scope.icon = [];
		$scope.input = false;
		$scope.load = false;
		$scope.errors = false;
		$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.city+',FR&mode=json&units=metric&cnt=7&APPID='+
APIKEYOPENWEATHER)
		.then(function(result) {
			if (result.data.cod === "200") {
				var list = result.data.list;
				$scope.city = result.data.city.name;
				list.forEach(function(element){
					$scope.icon.push({image:element.weather[0].icon, alt:element.weather[0].main, title:element.weather[0].description});
					var dateObject = new Date(element.dt * 1000);
					var dateReadable = jours[dateObject.getDay()]+' '+dateObject.getDate();
					$scope.days.push(dateReadable);
					$scope.temperature.push(Math.floor(element.temp.day));
				});
				$scope.load = true;
				$scope.ready = true;
			}
			else {
				$scope.errorCity = $scope.city;
				$scope.errors = true;
				$scope.load = true;
				$scope.ready = false;
				$scope.input = true;
			}
			
		});
	};
	

	$scope.button = function() {
		$scope.city = "";
		$scope.load = true;
		$scope.ready = false;
		$scope.input = true;
		$scope.errors = false;
	};
	
	function control(){
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
	}
	
	function control2(){
		$http.get('http://kgb.emn.fr:8001/channels/4/field/1.json?key=94BREBU27ZFTXJ38&results=1')
		.then(function(result){
		
			var feed = result.data.feeds[0];
			var inter = feed.field1;
			if(inter == null)
				control2();
			else
				$scope.inside = Math.floor(inter);
		});
	}
	
	control();
	control2();
	
	var intervalTempInt = $interval(control, 10000);
	var intervalReste= $interval(control2, 10000);

	$scope.energyReady = false;
	function current() {
		$http.get('http://kgb.emn.fr:8001/channels/4/field/6.json?results=310&key=94BREBU27ZFTXJ38')
			.then(function(result) {
				var donnees = result.data.feeds
					.filter(function(element) {
						return element.field6 !== null;
					})
					.map(function(a) {
				        var date = a.created_at;
				        var x = new Date(date).getTime();
				        var y = parseInt(a.field6);
				        return [x, y*220];
				    });
				$('#container').highcharts({
			        chart: {
			          type: 'line',
			          zoomType: 'x'
			        },
			        title: {
			          text: 'Electricity'
			        },
			        subtitle: {
			          text: 'Current consumption'
			        },
			        rangeSelector: {
			          buttons: [{
			            type: 'hour',
			            count: 1,
			            text: '1h'
			          }, {
			            type: 'day',
			            count: 1,
			            text: '1d'
			          }, {
			            type: 'month',
			            count: 1,
			            text: '1m'
			          }, {
			            type: 'year',
			            count: 1,
			            text: '1y'
			          }, {
			            type: 'all',
			            text: 'All'
			          }],
			          inputEnabled: false, // it supports only days
			          selected: 4 // all
			        },
			        xAxis: {
			          type: 'datetime',
			          //                minRange: 3600 * 1000, // one hour
			          ordinal: false
			        },
			        yAxis: {
			        //                 min: 0,
			        //                 max: 50,
			          floor: 0,
			        },
			        plotOptions: {
			          line: {
			            gapSize: 250
			          }
			        },
			        navigator: {
			          adaptToUpdatedData: false,
			          series: {
			            data: donnees
			          }
			        },
			        scrollbar: {
			          liveRedraw: false
			        },
			        series: [{
			        	showInLegend: false,
			          	data: donnees,
			          	dataGrouping: {
			            enabled: false
			          }
			        }]
			      });
			$scope.energyReady = true;
			});
	}
	current();
	current();//deuxieme appel pour forcer le redimensionnement (car sinon bug sur Safari)
	var intervalPromiseCurrent = $interval(current, 20000);
	$scope.$on('$destroy', function () { 
		$interval.cancel(intervalPromiseCurrent);
		$interval.cancel(intervalTempInt); 
		$interval.cancel(intervalReste); 		
	});
	

	
}]);

/*pistApp.directive('btn', function() {
	return {
		link: function (scope, element, attrs) {
			
		}
	}
});*/