// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// PATCH/DELETE Requests
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Request Status
const morgan = require("morgan");
app.use(morgan("tiny"));

// PUG
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/assets"));

const itemRoutes = require("./routes");
app.use("/items", itemRoutes);

// Homepage
app.get("/", function(req, res) {
	return res.render("home");
});

app.listen(3000, function() {
	console.log("Server up, do your thang...");
});