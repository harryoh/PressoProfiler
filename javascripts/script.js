var app = angular.module('myApp', [ 'googlechart' ]);

app.controller('MainCtrl', function($scope, $timeout, $filter) {
    var chart = $scope.chart = {};
    chart.type = "LineChart";
    chart.data = {
      "cols": [
        {id: "time", label: "Time", type: "string"},
        {id: "temper", label: "Temperature", type: "number"}
      ], "rows": [
        {c: [
            {v: "00:00"},
            {v: 50}
        ]}
      ]};

    chart.options = {
        width: 600,
        height: 400,
        title: 'Presso Profiler'
    };

    chart.formatters = {
      number : [{
        columnNum: 1}]
    };

    var sTime = new Date();
    $scope.counter = 0;
    $scope.data = [];
    $scope.checkTemperature = function () {
      $scope.counter += 10;
      var diffSec = $scope.counter;
      var pastTime = $filter('date')(diffSec*1000, 'mm:ss');
      var temp = getTemperature(diffSec);
      $scope.data = pastTime + ' ' + temp;
      chart.data.rows.push({c: [{v:pastTime},{v:temp}]});

      if (diffSec > 720) {
        $timeout.cancel(thandler);
        return;
      }
      thangler = $timeout($scope.checkTemperature, 300);
    };
    var thandler = $timeout($scope.checkTemperature, 300);

    var idx = 0;
    var getTemperature = function (time) {
      var map = [205, 204, 204, 203, 203, 202, 202, 201, 201, 200, 200,
               200, 199, 199, 198, 198, 197, 197, 196, 196, 195, 195,
               194, 194, 193, 193, 192, 192, 193, 193, 194, 194, 195,
               195, 196, 196, 195, 195, 194, 194, 193, 193, 194, 194,
               195, 195, 194, 194, 195, 195, 196, 196, 195, 195, 194,
               194, 195, 195, 195, 196, 196, 195, 195, 196, 195, 195,
               196, 196, 197, 197, 198, 198, 198, 198, 198, 199, 199,
               200, 200, 200, 201, 201, 202, 202, 202, 203, 203, 203,
               204, 204, 205, 205, 206, 207, 208, 209, 209, 210, 210,
               211, 212, 213, 213, 213, 214, 215, 215, 216, 215, 214,
               214, 213, 213, 212, 212, 211, 210, 210, 211, 211, 212,
               213, 212, 211, 210, 209, 209, 210, 210, 210, 209, 210];

      var temp = (time/3) + 50;
      if (temp > 205) {
        temp = map[idx];
        if (idx < map.length) idx++;
      }
      return Math.floor(temp);

    };
});