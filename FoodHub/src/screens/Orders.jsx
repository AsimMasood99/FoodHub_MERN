import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Orders() {
	function fetchData() {
		axios
			.get("/api/orders/getOrders", {
				headers: {
					userEmail: localStorage.getItem("userEmail"),
				},
			})
			.then((response) => setOrders(response.data));
	}
	const [orders, setOrders] = useState([]);
	useEffect(() => fetchData(), []);
	{
		console.log(orders);
	}
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow">
				<Navbar />
				<div className="text-white text-3xl font-bold text-center">Orders</div>
				<div className="flex flex-col gap-7 py-8 px-20">
					{orders.map((order, index) => {
						return (
							<div
								className="bg-white rounded-md border border-black shadow-sm shadow-black p-2"
								key={index}
							>
								<div className="flex justify-between">
									<div className="font-bold text-xl">{order.item}</div>
									<div>{order.date.slice(0, 10)}</div>
								</div>
								<div className="text-lg">
									{order.quantity} x {order.size}
								</div>
								<div className="text-lg font-bold">Price: {order.price}</div>
							</div>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Orders;
