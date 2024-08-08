import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import CartContextProvider from "./context/cardContextProvider";
import Orders from "./screens/Orders";


function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<CartContextProvider>
				<Router>
					<div>
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<SignUp />} />
							<Route exact path="/orders" element={<Orders />} />
						</Routes>
					</div>
				</Router>
			</CartContextProvider>
		</>
	);
}

export default App;
