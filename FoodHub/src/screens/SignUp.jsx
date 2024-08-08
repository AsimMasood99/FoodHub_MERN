import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
export default function SignUp() {
	const navigate = useNavigate();
	const [duplicateEmailError, setDuplicateEmailError] = useState(false);
	const [creds, setCreds] = useState({
		name: "",
		email: "",
		password: "",
	});

	function onChangeHandler(e) {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	}

	// Post user credentials to backend
	async function handelSubmit(e) {
		e.preventDefault();
		axios.post("/api/user/signup", creds).then((response) => {
			{
				console.log(response);
				if (response.data?.error?.code) {
					setDuplicateEmailError(true);
					setCreds({ ...creds, email: "", password: "" });
				} else navigate("/login");
			}
		});
	}

	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow">
				<div className="mt-6 text-white text-center text-3xl font-bold">
					FoodHub
				</div>
				<div className="mt-44 flex justify-center">
					<form
						className="text-black bg-white flex flex-col w-96 gap-2 border-2 border-black rounded-md  p-5 text-lg"
						action=""
						onSubmit={handelSubmit}
					>
						<label className="text-lg" htmlFor="name">
							Name
						</label>
						<input
							className="text-black px-3 py-1 rounded border border-black"
							type="text"
							name="name"
							value={creds.name}
							onChange={onChangeHandler}
						/>
						<label className="text-lg" htmlFor="email">
							Email
						</label>
						<input
							className="text-black px-3 py-1 rounded border border-black"
							type="email"
							name="email"
							value={creds.email}
							onChange={onChangeHandler}
						/>
						{duplicateEmailError && (
							<div className="text-sm text-red-700">
								⚠️ Email already taken. Plase try again with a different email
							</div>
						)}
						<label className="text-lg" htmlFor="password">
							Password
						</label>
						<input
							className="text-black px-3 py-1 rounded border border-black"
							type="password"
							name="password"
							value={creds.password}
							onChange={onChangeHandler}
						/>
						<div className="mt-4 flex flex-col items-center justify-center">
							<button
								type="submit"
								className="bg-white w-fit px-2 text-black border border-black rounded-md"
							>
								Create Account
							</button>
							<Link to="/login">
								<div>Already a User? Login</div>
							</Link>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
}
