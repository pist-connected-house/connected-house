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
				
		});
	}
	control();
	$interval(control,5000);


	$scope.energyReady = false;
	function current() {
		$http.get('http://kgb.emn.fr:8001/channels/4/field/6.json?results=310&key=94BREBU27ZFTXJ38')
			.then(function(result) {
				var donnees = result.data.feeds.map(function(a) {
			        var date = a.created_at;
			        var x = new Date(date).getTime();
			        var y = parseInt(a.field6);
			        return [x, y*220];
			      });
				var essai = $('#container').highcharts({
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
			
			document.querySelector('.highcharts-container').style.width = '100%';
			$scope.energyReady = true;
			});
	}
	current();
	$interval(current, 20000);

	
}]);

/*pistApp.directive('btn', function() {
	return {
		link: function (scope, element, attrs) {
			
		}
	}
});*/