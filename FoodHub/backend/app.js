import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
const app = express();
const port = 3000;
const databaseConnectionString =
	"mongodb+srv://asimmasood707:plantsVsZombies@foodhub.tczkixo.mongodb.net/FoodHub";

app.listen(process.env.PORT, () => {
	console.log(`Listning to port ${process.env.port}`);
});

app.get("/", async(req,res)=>{
	res.send("Hello World")
})

mongoose
	.connect(databaseConnectionString)
	.then(() => {
		console.log("Successfully connected to database");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());

// Routes

import userRouter from "./routes/user.routes.js";
app.use("/api/user", userRouter);

import dataRouter from "./routes/foodData.routes.js";
app.use("/api/data", dataRouter);

import orderRouter from "./routes/order.routes.js";
app.use("/api/orders/", orderRouter);

