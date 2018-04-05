const express = require("express");
const router = express.Router();

// The Shopping List
const shoppingList = [
	{
		name: "Ski Poles", 
		price: 75, 
		id: 1
	}, 
	{
		name: "Toe Warmers",
		price: 4, 
		id: 2
	}, 
	{
		name: "WiFi Router", 
		price: 150, 
		id: 3
	}, 
	{
		name: "N64", 
		price: 200, 
		id: 4
	}
];
var id = 5;

// All Items Page
router
	.route("")
	.get((req, res, next) => {
		return res.render("items", {shoppingList});
	})
	.post((req, res, next) => {
		console.log(req.body);
		shoppingList.push({
			name: req.body.name,
			price: req.body.price,
			id: id++
		}); // Add item to shopping list
		return res.redirect("/items");
	});

// Add New Item Form
router.get("/new", function(req, res) {
	return res.render("newItem");
});

// Single Item Page
router
	.route("/:id")
	.get((req, res, next) => {
		const item = shoppingList.find(val => val.id === Number(req.params.id));
		console.log(item);
		return res.render("item", {item}); // {item} --> {item: item}
	})

module.exports = router;