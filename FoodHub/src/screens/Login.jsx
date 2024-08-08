import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
export default function Login() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	const [creds, setCreds] = useState({
		email: "",
		password: "",
	});

	function onChangeHandler(e) {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	}

	function handelSubmit(e) {
		e.preventDefault();
		axios
			.post("/api/user/login", creds)
			.then((response) => {

				if(response.data?.error){
					setErrorMessage(response.data.error);
					
				}
				else{
				localStorage.setItem("authToken", response.data.authToken);
				localStorage.setItem("userName", response.data.user.name);
				localStorage.setItem("userEmail", response.data.user.email);
				navigate("/");
				}
			})
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
						<label htmlFor="email">Email</label>
						<input
							className="text-black px-3 py-1 rounded focus:outline-none border border-black "
							type="email"
							name="email"
							value={creds.email}
							onChange={onChangeHandler}
						/>
						<label htmlFor="password">Password</label>
						<input
							className="text-black px-3 py-1 rounded focus:outline-none border border-black"
							type="password"
							name="password"
							value={creds.password}
							onChange={onChangeHandler}
						/>
						<div className="text-sm text-red-700">{errorMessage}</div>
						<div className="mt-4 flex flex-col items-center justify-center">
							<button
								type="submit"
								className="bg-white w-[6rem] text-black border border-black rounded-md"
							>
								Log In
							</button>
							<Link to="/signup">
								<div>Not a User? Create Accout</div>
							</Link>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
}
