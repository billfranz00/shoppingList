// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// PUG
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/assets"));

// The Shopping List
const shoppingList = [{name: "Ski Poles", price: 75}, {name: "Toe Warmers", price: 4}, {name: "WiFi Router", price: 150}, {name: "N64", price: 200}];

// Homepage
app.get("/", function(req, res) {
	return res.render("home");
});

// Shopping List
app.get("/items", function(req, res) {
	return res.render("items", {shoppingList});
});

// Item Form
app.get("/items/new", function(req, res) {
	return res.render("newItem");
});

// Submit New Item
app.post("/items", function(req, res) {
	console.log(req.body);
	shoppingList.push(req.body); // Add item to shopping list
	return res.redirect("/items");
});

app.listen(3000, function() {
	console.log("Server up, do your thang...");
});