import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

type TProps = {
	items: { name: string; href: string }[];
	handleNavClick: (href: string) => void;
};

const NavItems = ({ items, handleNavClick }: TProps) => {
	const lastInternalIdx = items.findIndex(
		(item, i) =>
			item.href.startsWith("#") &&
			(i + 1 === items.length || !items[i + 1].href.startsWith("#"))
	);

	return items.map((item, i) => (
		<React.Fragment key={item.name}>
			<motion.div
				whileHover={{ y: -2 }}
				className="flex items-center space-x-1"
			>
				{item.href.startsWith("#") ? (
					<button
						onClick={() => handleNavClick(item.href)}
						className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
					>
						{item.name}
					</button>
				) : (
					<Link
						href={item.href}
						className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
					>
						{item.name}
					</Link>
				)}
			</motion.div>
			{i === lastInternalIdx && (
				<span className="mx-2 h-5 border-l border-border" />
			)}
		</React.Fragment>
	));
};

export default NavItems;
