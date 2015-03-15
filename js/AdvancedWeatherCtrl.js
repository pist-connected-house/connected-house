pistApp.controller('AdvancedWeatherController', ['$scope', '$http', "$interval", function($scope, $http, $interval){
    $scope.control = function(){
        $http.get('http://kgb.emn.fr:8001/channels/5/feed.json?key=ZSAVTBI11WQOSJWY&results=1')
	.then(function(result) {
		var feed = result.data.feeds[0];
		$scope.temp = parseFloat(feed.field2).toFixed(1);
		$scope.humidity = Math.floor(feed.field3);
		$scope.direction = Math.floor(feed.field7);
        $scope.speed = Math.floor(feed.field8);
            $scope.intermediaire =(17,27*$scope.temp)/(237,7+$scope.temp)+Math.log($scope.humidity);
            $scope.tempF=Math.floor($scope.temp*1.8+32);
            $scope.dewpoint=parseFloat((237,7*$scope.intermediaire)/(17,27-$scope.intermediaire)).toFixed(1);
            $scope.intermed=parseFloat(-42,379+2,049*$scope.tempF+10,143*$scope.humidity*100-0.225*$scope.tempF*$scope.humidity*100).toFixed(1);
            $scope.tempercu=($scope.intermed-32)/1,8;
                                                                             
    });
          };
    $scope.control2 = function(){
     
    };
    
    $scope.control();
    $scope.control2();
    }]);
    