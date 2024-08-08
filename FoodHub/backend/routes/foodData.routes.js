import { Router } from "express";
import mongoose from "mongoose";
const router = Router();

router.get("/foodData", async (req, res) => {
	const foodItemsCollection = mongoose.connection.db.collection("foodItems");
	const categoryCollection =
		mongoose.connection.db.collection("foodCategories");
	foodItemsCollection
		.find({})
		.toArray()
		.then((itemsResult) => {
			categoryCollection
				.find({})
				.toArray()
				.then((categoryResult) => {
					res.send([itemsResult, categoryResult]);
				});
		});
});

export default router;
