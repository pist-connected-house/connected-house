var pistApp = angular.module('pistApp', ['ngRoute']);
pistApp.controller('MainController', ['$scope', function($scope){
	
}]);

pistApp.controller('ElectricityController', ['$scope', function($scope){
  $scope.ready = false;
  var example = 'lazy-loading',
    theme = 'default';

  function afterSetExtremes(e) {
    var chart = $('#container').highcharts();
    chart.showLoading('Loading data from server...');
    $.getJSON('http://kgb.emn.fr:8001/util/my-from-sql.php?channel_id=4&field=field6&start=' + Math.round(e.min) +
        '&end=' + Math.round(e.max) + '&callback=?', function(data) {
        if (data[0].length === 2 && chart.series[0].type === 'candlestick') {
          chart.series[0].update({type: 'line'});
          chart.series[0].setData(data);
        } 
        else if (data[0].length === 5 && chart.series[0].type === 'line') {
          chart.series[0].setData(data);
          chart.series[0].update({type: 'candlestick'});
        } 
        else {
          chart.series[0].setData(data);
        } // if
        chart.hideLoading();
    });
  }  

  $.getJSON('http://kgb.emn.fr:8001/util/my-from-sql.php?channel_id=4&field=field6&callback=?', function(data) {
            $scope.$apply(function(){
              $scope.ready = true;
              // create the chart
              var myDate="30-01-2015";
              myDate=myDate.split("-");
              var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
              var timestamp = new Date(newDate).getTime();
              $('#container').highcharts('StockChart', {
                  chart: {
                      type: 'line',
                      zoomType: 'x'
                  },
                  plotOptions: {
                      line: {
                          gapSize: 250
                      }
                  },
                  navigator: {
                      adaptToUpdatedData: false,
                      series: {
                          data: data
                      }
                  },
                  scrollbar: {
                      liveRedraw: false
                  },
                  title: {
                      text: 'Channel 4'
                  },
                  subtitle: {
                      text: 'Field 6'
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
                      events: {
                          afterSetExtremes: afterSetExtremes
                      },
                      plotLines: [{
                color: 'red', // Color value
                //dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                value: timestamp, // Value of where the line will appear
                width: 2 // Width of the line    
              }],
                      //                minRange: 3600 * 1000, // one hour
                      ordinal: false
                  },
                  yAxis: {
                      //                 min: 0,
                      //                 max: 50,
                      floor: 0
                  },
                  series: [{
                      data: data,
                      dataGrouping: {
                          enabled: false
                      }
                  }]
              });
              $('#container').highcharts().series[0].update({
                  type: 'candlestick'
              });
              });
        });

}]);

pistApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    	when('/', {
    		templateUrl: 'pages/index.html',
    	}).
    	when('/energy', {
        templateUrl: 'pages/energy.html',
        controller: 'MainController'
      }).
      when('/energy/electricity', {
        templateUrl: 'pages/electricity.html',
        controller: 'ElectricityController'
      }).
      when('/energy/water', {
        templateUrl: 'pages/water.html',
        controller: 'MainController'
      }).
    	when('/energy/weather', {
      	templateUrl: 'pages/weather.html',
      	controller: 'MainController'
    	}).
    	otherwise({
      	redirectTo: '/'
    	});
  	}
]);

