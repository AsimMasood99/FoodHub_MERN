import { Router } from "express";
import Order from "../models/order.js";

const router = Router();

router.post("/placeOrder", async (req, res) => {
	const orders = [];
	req.body.items.map((order) => {
		const newOrder = new Order({
			email: req.body.email,
			date: new Date(),
			item: order.name,
			size: order.size,
			quantity: order.quantity,
			price: order.price
		});
		orders.push(newOrder);
	});

	Order.insertMany(orders)
		.then((response) => res.json({ res: response, status: "Success" }))
		.catch((error) => res.json({ error: error }));
});

router.get("/getOrders", async (req, res) => {
	
	Order.find({ email: req.headers["useremail"] })
		.populate("item")
		.then((orders) => {
			
			res.json(orders);
		})
		.catch((err) => {
			
			res.send(err);
		});
});

export default router;
