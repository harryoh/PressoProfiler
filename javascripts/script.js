var app = angular.module('myApp', [ 'googlechart' ]);

app.controller('MainCtrl', function($scope, $timeout, $filter) {
    var chart = $scope.chart = {};
    chart.type = "LineChart";
    chart.data = {
      "cols": [
        {id: "time", label: "Time", type: "string"},
        {id: "temper", label: "Temperature", type: "number"}
      ], "rows": []
    };

    chart.options = {
        width: 600,
        height: 400,
        title: 'Presso Profiler'
    };

    chart.formatters = {
      number : [{
        columnNum: 1}]
    };

    var map = [
      109, 90, 89, 94, 98, 104, 110, 116, 122, 127, 132, 136,
      141, 144, 148, 151, 154, 157, 160, 163, 166, 168, 171, 173,
      176, 178, 180, 182, 184, 185, 187, 189, 190, 191, 192, 194,
      195, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 206,
      207, 207, 207, 207, 206, 207, 206, 206, 206, 206, 207, 207,
      207, 208, 208, 208, 209, 209, 210, 210, 210, 210, 210, 210
    ];

    var sTime = new Date();
    $scope.counter = 0;
    $scope.data = [];
    $scope.checkTemperature = function () {
      if (idx >= map.length) {
        $timeout.cancel(thandler);
        return;
      }

      $scope.counter += 10;
      var diffSec = $scope.counter;
      var pastTime = $filter('date')(diffSec*1000, 'mm:ss');
      var temp = getTemperature(diffSec);
      $scope.data = pastTime + ' ' + temp;
      chart.data.rows.push({c: [{v:pastTime},{v:temp}]});

      thangler = $timeout($scope.checkTemperature, 100);
    };
    var thandler = $timeout($scope.checkTemperature, 100);

    var idx = 0;
    var getTemperature = function (time) {
      return Math.floor(map[idx++]);
    };
});
