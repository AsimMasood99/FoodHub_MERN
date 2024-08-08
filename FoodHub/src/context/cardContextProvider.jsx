import React, { act, useReducer, useState } from "react";
import CartContext from "./cardContext";
import axios from "axios";


function reducer(state, action) {
	switch (action.type) {
		case "ADD": {
			const sameItem = state.filter(
				(item) =>
					item.id == action.payload.id && item.size == action.payload.size
			);
			if (sameItem.length > 0) {
				return state.map((item) => {
					if (item.id == sameItem[0].id && item.size === sameItem[0].size) {
						return {
							...item,
							quantity:
								parseInt(action.payload.quantity) +
								parseInt(sameItem[0].quantity),
							price: action.payload.price + sameItem[0].price,
						};
					} else return { ...item };
				});
			} else
				return [
					...state,
					{
						id: action.payload.id,
						name: action.payload.name,
						size: action.payload.size,
						quantity: action.payload.quantity,
						price: action.payload.price,
					},
				];
		}

		case "CHECKOUT": {
			return state.filter((item)=> item.id != action.payload.id);
		}

		case "CHECKOUTALL": {
			return []
		}
	}
}

const CartContextProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(reducer, []);
	return (
		<CartContext.Provider value={{ cart, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
