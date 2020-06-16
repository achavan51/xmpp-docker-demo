var Ejabberd = require("ejabberd");
var e = new Ejabberd("ubuntu:apt", {
  checkerInterval: 1000,
});

// The address of virtual host
var host = "example.lvh.me";
var config = { host: host };

function test_ejabber() {
  // Add a virtual host to ejabberd's configuration then restart server
  var p1 = e.addVhost(host, config);

  p1.then(
    // This return a promise
    // success
    function () {},
    // error
    function (err) {}
  );

  var username = "Lorem";
  var password = "secret";

  // Register a new use
  var p2 = e.register(username, host, password);

  p2.then(
    // This is also a promise
    // success
    function () {},
    // error
    function (err) {}
  );
}

e.once("status", function (status) {
  test_ejabber();
});
