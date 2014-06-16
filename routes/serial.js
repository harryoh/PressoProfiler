var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;

exports.list = function(req, res) {
  var serial_list = [];
  serialport.list(function(err, ports) {
    ports.forEach(function(port) {
      serial_list.push({
        deviceName: port.comName,
        pnpId: port.pnpId,
        manufacturer: port.manufacturer
      });
    });
    res.send(serial_list);
  });
};
