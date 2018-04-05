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

// /items
router
	.route("")
	.get((req, res, next) => { // All Items Page
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

// /items/new
router.get("/new", function(req, res) { // Add New Item Form
	return res.render("newItem");
});

// /items/:id
router
	.route("/:id")
	.get((req, res, next) => { // Single Item Page
		const item = shoppingList.find(val => val.id === Number(req.params.id));
		console.log(item);
		return res.render("item", {item}); // {item} --> {item: item}
	})
	.patch((req, res, next) => {
		const item = shoppingList.find(val => val.id === Number(req.params.id));
		if(req.body.name !== "") {
			item.name = req.body.name;
		}
		if(req.body.price !== "") {
			item.price = req.body.price;
		}
		return res.redirect(`./${item.id}`)
	})
	.delete((req, res, next) => {
		const itemIndex = shoppingList.findIndex(val => val.id === Number(req.params.id));
		shoppingList.splice(itemIndex, 1);
		return res.redirect("/items")
	});

// /items/:id/edit
router.get("/:id/edit", (req, res, next) => { // Edit Single Item Page
	const item = shoppingList.find(val => val.id === Number(req.params.id));
	return res.render("editItem", {item});
});

module.exports = router;