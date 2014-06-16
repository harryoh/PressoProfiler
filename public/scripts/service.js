'use strict';

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  console.log('Connect!!!');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }
  };
});