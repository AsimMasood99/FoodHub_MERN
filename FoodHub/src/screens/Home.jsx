import React, { useContext, useEffect, useState } from "react";
import {
	BsChevronCompactLeft,
	BsChevronCompactRight,
	BsSearch,
} from "react-icons/bs";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";
import Cart from "../components/Cart";
import CartContext from "../context/cardContext";
import Footer from "../components/Footer"
const crousalImages = ["/food1.jpg", "/food2.jpg", "/food3.jpg"];

export default function Home() {
	const [foodItems, setFoodItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [cartVisibility, setCartVisibility] = useState(false);

	function updateSearch(e) {
		setSearchText(e.target.value);
	}
	const nextImage = function () {
		let isLastImage = index === crousalImages.length - 1;
		setIndex(isLastImage ? 0 : index + 1);
	};

	const prevImage = () => {
		let isLastImage = index === 0;
		setIndex(isLastImage ? crousalImages.length - 1 : index - 1);
	};

	function fetchCardData() {
		axios
			.get("/api/data/foodData")
			.then((response) => {
				setFoodItems(response.data[0]);
				setCategories(response.data[1]);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function showCart() {
		setCartVisibility(true);
	}

	function closeCart() {
		setCartVisibility(false);
	}

	useEffect(() => {
		const interval = setInterval(nextImage, 5000);
		return () => clearInterval(interval);
	}, [index]);

	useEffect(fetchCardData, []);

	return (
		<>
			<div style={{ overflow: cartVisibility ? "hidden" : "" }}>
				{cartVisibility ? (
					<div className=" fixed z-10 h-screen w-screen flex justify-center items-center bg-slate-950/75">
						<div>
							<Cart closeCart={closeCart}></Cart>
						</div>
					</div>
				) : (
					""
				)}
				<div>
					<div className="max-w-full max-h-[35rem] w-full relative">
						<div className="absolute inset-0">
							<Navbar showCart={showCart} />
						</div>
						<div
							style={{ backgroundImage: `url(${crousalImages[index]})` }}
							className="w-full h-[35rem] bg-center bg-cover duration-500"
						></div>
						<div className="absolute inset-0 top-1/2 pl-4">
							<BsChevronCompactLeft
								onClick={prevImage}
								className="text-white cursor-pointer bg-white/15 hover:bg-white/30 rounded-full p-[3px]"
								size={40}
							/>
						</div>
						<div className="absolute inset-0 top-1/2 left-auto pr-4">
							<BsChevronCompactRight
								onClick={nextImage}
								className="text-white cursor-pointer bg-white/15 hover:bg-white/30 rounded-full p-[3px]"
								size={40}
							/>
						</div>
						<div className="absolute top-[80%] flex justify-center items-center w-full text-white">
							<div className=" bg-white flex justify-center items-center rounded-md border-2 border-black px-2 gap-2">
								<BsSearch className="text-black text-xl" />
								<input
									type="text"
									className="w-[35rem] text-lg h-9 text-black rounded focus:outline-none"
									placeholder="Search"
									value={searchText}
									onChange={updateSearch}
								></input>
							</div>
						</div>
					</div>
				</div>
				<div>
					{categories.map((category) => {
						return (
							<>
								<div
									className="text-center text-3xl text-white p-10 font-bold"
									key={category._id}
								>
									{category.CategoryName}
								</div>
								<div className="grid px-10 gap-y-10 grid-cols-1 sm:grid-cols-4 justify-items-center">
									{foodItems
										.filter(
											(item) =>
												item.CategoryName == category.CategoryName && // here i am adding a check for search and it works  .. when i for example search pizza every thing on the screen in disappers other than pizza which is how it is supposed to work and it work . but how is it working i cant understand that .. once all the things are rendered this block should not be executed again .. how does it rerender according to the search text when there is no state attached to the cards element for em to rerender. i just am not understanding why is this working as it is
												item.name
													.toLowerCase()
													.includes(searchText.toLowerCase())
										)
										.map((filteredItem) => {
											return <Card item={filteredItem} />;
										})}
								</div>
							</>
						);
					})}
				</div>
			</div>
			<div className="mt-6"> 
			<Footer/>
			</div>
		</>
	);
}
