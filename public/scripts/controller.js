'use strict';

google.setOnLoadCallback(function () {  
    angular.bootstrap(document.body, ['chartApp']);
});
google.load('visualization', '1', {packages: ['corechart']});

app.controller('ChartCtrl', function($scope, $filter, socket) {
  var data = new google.visualization.DataTable();
  data.addColumn("string","Time")
  data.addColumn("number","Temperature")
  
  var options = {
    'title': 'Presso Profiler',
    'height': 400
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
  
  var sTime = new Date();
  socket.on('SENDVALUE', function (value) {
    var pastTime = (new Date()) - sTime;
    $scope.data = value;
    data.addRow([$filter('date')(pastTime, 'mm:ss'), value]);
    chart.draw(data, options);

  });
});