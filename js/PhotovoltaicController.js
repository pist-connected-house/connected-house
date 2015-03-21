pistApp.controller('PhotovoltaicController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.errors = false;
	$scope.loaded = false;
	$scope.inverter = {
		number: 1,
	};
	$scope.power = {
		type : 'ac',
	};

	$scope.getPhotoData = function(start, end){
		if (start > end) { 
			$scope.errors = true;
			$scope.message = 'Please enter dates in chronological order';
		}
		else
			$scope.errors = false;
			$scope.loaded = true;
			//requete http en convertissant les date en timestamp
			$http.get('http://localhost:8000/photovolta-from-sql.php?ondul='+$scope.inverter.number+'&start='+new Date(start).getTime()+'&end='+new Date(end).getTime())
			.then(function(result) {
				$scope.feeds = result.data.feeds;
			});
	};

	$scope.back = function() {
		$scope.loaded = false;
	};

	//Date picker settings
	$scope.datepickers = {
	    startDt: false,
	    endDt: false
    };

	$scope.today = function() {
		$scope.startDt = Date.parse(new Date());
		$scope.endDt = Date.parse(new Date());
  	};
  	$scope.today();

	$scope.clear = function () {
		$scope.startDt = null;
	};


	$scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date > new Date()));
	  };


	$scope.open = function($event, which) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepickers[which]= true;
      };

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.formats = ['dd/MM/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	//http://stackoverflow.com/questions/22269964/how-to-use-2-or-more-angular-ui-bootstrap-datepicker-in-1-form
}]);