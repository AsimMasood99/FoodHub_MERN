import React from "react";
import { Link } from "react-router-dom";
function Footer() {
	return (
		<footer className="flex flex-col gap-5 items-center p-8 text-white bg-zinc-900">
			<div className="flex gap-3">
      <Link to="https://www.linkedin.com/in/asim-masood-1bb461311/"><div>LinkedIn</div></Link>
      <Link to="mailto:asim.masood707@gmail.com"><div>Email</div></Link>
      </div>
			<div>© 2024 FoodHub. All rights reserved.</div>
      <div>Built By Asim Masood</div>
		</footer>
	);
}

export default Footer;
