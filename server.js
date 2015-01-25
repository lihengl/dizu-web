var favicon = require("serve-favicon");
var express = require("express");
var robots  = require("robots.txt");
var morgan  = require("morgan");

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";

var server = express().disable("x-powered-by").enable("strict routing");

server.set("view engine", "jade");
server.set("views", __dirname);

if (mode === "local") {
    server.use(morgan("combined"));
    ["/bower_components", "/static"].forEach(function (dirname) {
        "use strict";
        server.use(dirname, express.static(__dirname + dirname));
    });
}

server.use(favicon(__dirname + "/favicon.ico"));
server.use(robots(__dirname + "/robots.txt"));

server.get("/index.html", function (req, res) {
    "use strict";
    return res.render("template", { local: (mode === "local") });
});

if (mode === "test") {
    module.exports = server;
} else if (mode === "local") {
    console.log("server running on http://localhost:%d ...", port);
    server.locals.pretty = true;
    server.listen(port);
} else {
    server.listen(port);
}

