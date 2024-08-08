import React, { useContext, useState } from "react";
import CartContext from "../context/cardContext";
import axios from "axios";

function Cart({ closeCart }) {
	const { cart, dispatch } = useContext(CartContext);
	let totalPrice = 0;

	function checkOutItem(item) {
		axios
			.post("/api/orders/placeOrder", {
				email: localStorage.getItem("userEmail"),
				items: [item],
			})
			.then((response) => {
				console.log(response);
				dispatch({
					type: "CHECKOUT",
					payload: {
						id: item.id,
					},
				});
			});
	}

	function CheckOutAll() {
		axios
			.post("/api/orders/placeOrder", {
				email: localStorage.getItem("userEmail"),
				items: cart,
			})
			.then(() => dispatch({ type: "CHECKOUTALL" }));
	}

	return (
		<>
			<div className="flex flex-col border-2 border-black justify-between rounded-lg p-5 h-[36rem] w-[55rem]  bg-white">
				<div>
					<div className="my-5 text-4xl font-bold">My Cart</div>
					<div className="flex flex-col gap-5 h-[24rem] overflow-y-scroll">
						{cart.length == 0
							? "No Items In Cart"
							: cart.map((cartData, index) => {
									totalPrice += cartData.price;
									return (
										<div
											className="flex justify-between items-end border rounded shadow-xl p-3 border-black text-lg"
											key={index}
										>
											<div>
												<div className="font-bold text-xl">{cartData.name}</div>
												<div>
													{cartData.quantity} x {cartData.size}
												</div>
												<div>Price: {cartData.price}</div>
											</div>
											<button
												className="border p-1 rounded border-black"
												onClick={() => checkOutItem(cartData)}
											>
												Check Out
											</button>
										</div>
									);
							  })}
					</div>
				</div>
				<div className="flex justify-between items-end">
					<button
						className="border border-black mt-7 rounded-md w-20 p-2 text-lg"
						onClick={closeCart}
					>
						Close
					</button>
					<div className="flex items-center text-lg gap-6">
						<div className="font-bold">Total Price: {totalPrice}</div>
						<button
							onClick={CheckOutAll}
							className="border border-black p-2 rounded-md"
						>
							Check out all
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cart;
