pistApp.controller('PhotovoltaicController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.errors = false;

	$scope.getPhotoData = function(start, end){
		if (start > end) { 
			$scope.errors = true;
			$scope.message = 'Please enter dates in chronological order';
		}
		else
			$scope.errors = false;
			//requete http en convertissant les date en timestamp
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


	/*$scope.toggleMin = function() {
	$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();*/

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