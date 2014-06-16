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
      var map = [205, 203, 202, 200, 200, 199, 197, 196, 195, 196, 197,
                 198, 199, 200, 201, 202, 203, 204, 204, 205, 206, 207,
                 208, 208, 208, 209, 209, 209, 210, 209, 209, 210, 210,
                 211, 210, 209, 209, 210, 211, 210];

      var temp = (time/3) + 50;
      if (temp > 205) {
        temp = map[idx];
        if (idx < map.length) idx++;
      }
      return Math.floor(temp);

    };
});