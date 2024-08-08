import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar(props) {
	const nevigate = useNavigate();
	function logout() {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userName");
		localStorage.removeItem("userEmail");
		nevigate("/login");
	}
	return (
		<div className="flex justify-between items-center p-6 text-lg h-16 text-white">
			<Link to="/">
				<div className="text-4xl font-bold">FoodHub</div>
			</Link>
			<div className="flex gap-9">
				{localStorage.getItem("authToken") ? (
					<>
						<ul className="flex gap-2">
							<li>
								<Link to="/orders">
									<button>My Orders</button>
								</Link>
							</li>
							<li>
								<button onClick={props.showCart}>My Cart</button>
							</li>
						</ul>
						<ul className="flex gap-2">
							<li>
								<button onClick={logout}>Logout</button>
							</li>
						</ul>
					</>
				) : (
					<ul className="flex gap-2">
						<Link to="/login">
							<button>Login</button>
						</Link>
						<Link to="/signup">
							<button>SignIn</button>
						</Link>
					</ul>
				)}
			</div>
		</div>
	);
}
