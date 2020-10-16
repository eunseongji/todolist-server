"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _todos = _interopRequireDefault(require("./routes/todos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var whitelist = ['http://localhost:3000', 'http://192.168.1.44:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);

    if (whitelist.indexOf(_origin) === -1) {
      var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
};
app.use(_express["default"].json());
app.use((0, _cors["default"])(corsOptions));
app.use('/todos', _todos["default"]);
app.listen(5000, function () {
  console.log("Server started on Part 5000");
});