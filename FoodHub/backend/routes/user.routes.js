import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const router = Router();
const secret = "thisIsMyMernWebSiteDontTryToHackItBecauseYouArntGonnaBeAbleTo";

router.post(
	"/signup",
	[
		body("name").notEmpty(),
		body("email").isEmail(),
		body("password").isLength({ min: 6 }),
	],
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) res.status(400).send(validationErrors);
		else {
			const salt = await bcrypt.genSalt();
			const encryptedPass = await bcrypt.hash(req.body.password, salt);
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: encryptedPass,
			});

			newUser
				.save()
				.then(() => {
					res.json({ user: newUser });
				})
				.catch((err) => {
					res.json({error: err})
				});
		}
	}
);

router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({ email: req.body.email });
		if (!userData) {
			res.send({error: "No user with this email"});
		} else if (!(await bcrypt.compare(req.body.password, userData.password)))
			res.send({error: "Invalid Password"});
		else {
			const data = {
				user: {
					id: userData.id,
				},
			};
			const authToken = jwt.sign(data, secret);
			res.json({ user: userData, authToken: authToken });
		}
	} catch (err) {

		console.log(err);
		res.send(err)
	}
});

export default router;
