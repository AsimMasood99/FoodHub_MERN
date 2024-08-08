import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/cardContext";

export default function Card({ item }) {
	const optionValues = Object.keys(item.options[0]);

	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(quantity);
	const [option, setOption] = useState(optionValues[0]);
	const { cart, dispatch } = useContext(CartContext);

	const addToCart = () => {
		dispatch({
			type: "ADD",
			payload: {
				id: item._id,
				name: item.name,
				size: option,
				quantity: quantity,
				price: price,
			},
		});
	};

	function updateQuantity(e) {
		if (e.target.value > -1 && e.target.value <= 20)
			setQuantity(e.target.value);
		else return;
	}

	function updateOption(e) {
		console.log(e.target.value);
		setOption(e.target.value);
	}

	function updatePirce() {
		setPrice(quantity * item.options[0][option]);
	}

	useEffect(updatePirce, [quantity, option]);
	return (
		<>
			<div className="flex flex-col border border-white h-[36rem] w-80 items-center text-white rounded-lg">
				<div className="h-60 w-[90%] my-5">
					<img className="h-full w-full object-fill" src={item.img} alt="" />
				</div>
				<div className="flex flex-col gap-5 w-full px-5">
					<div className="font-bold text-xl">{item.name}</div>
					<div>{item.description}</div>
					<div className="flex flex-col gap-3 mr-6">
						<div className="flex gap-3 items-center">
							<span className="text-lg">Quantity</span>
							<input
								className="w-[8rem] p-1 bg-black rounded border border-white"
								type="number"
								value={quantity}
								onChange={updateQuantity}
							/>
						</div>
						<div className="flex gap-12 items-center">
							<span className="text-lg">Size</span>
							<select
								className="min-w-min w-[8rem] p-1 bg-black rounded border border-white"
								name="Quantity"
								onChange={updateOption}
							>
								{optionValues.map((opt, index) => (
									<option key={index} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex justify-between items-center text-xl">
						<span className="font-bold ">Total Pirce: {price}</span>
						<button
							onClick={addToCart}
							className="bg-gray-950 border p-1 border-white rounded"
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
