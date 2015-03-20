pistApp.controller('AdvancedWeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
	
	$scope.tempercu;
	
	
    $scope.control = function(){
        $http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')
	.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temp = parseFloat(feed.field2);
		$scope.humidity = Math.floor(feed.field3);
		$scope.direction = Math.floor(feed.field7);
        $scope.speed = Math.floor(feed.field8);
        $scope.intermediaire =(17,27*$scope.temp)/(237,7+$scope.temp)+Math.log($scope.humidity);
        //$scope.tempF=Math.floor($scope.temp*1.8+32);
		
        $scope.dewpoint=parseFloat((237,7*$scope.intermediaire)/(17,27-$scope.intermediaire)).toFixed(1);
		 if($scope.speed >= 4.8) {
			 $scope.tempercu = (13.12 + 0.6215*$scope.temp - 11.37*Math.pow($scope.speed, 0.16) + 0.3965*$scope.temp*Math.pow($scope.speed, 0.16)).toFixed(1);
		 }
		 else {
			 $scope.tempercu =($scope.temp + 0.2*(0.1345*$scope.temp-1.59)*$scope.speed).toFixed(1);
		 }
		
		
		
                                                                             
    });
    };
    /*$scope.control2 = function(){
     
    };*/
    
    $scope.control();
    //$scope.control2();
	
	var intervalTempInt = $interval($scope.control, 10000);
	//var intervalReste= $interval($scope.control2, 10000);


  $scope.$on('$destroy', function () { 
    $interval.cancel(intervalTempInt); 
    //$interval.cancel(intervalReste); 
  });
	
    }]);
    