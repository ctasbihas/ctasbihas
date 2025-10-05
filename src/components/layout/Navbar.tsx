"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavItems from "./NavItems";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const navItems = () => {
		if (pathname === "/") {
			return [
				{ name: "Home", href: "#home" },
				{ name: "About", href: "#about" },
				{ name: "Skills", href: "#skills" },
				{ name: "Top Projects", href: "#projects" },
				{ name: "Contact", href: "#contact" },
				{ name: "Projects", href: "/projects" },
				{ name: "Blogs", href: "/blogs" },
				{
					name: token ? "Dashboard" : "Login",
					href: token ? "/dashboard" : "/login",
				},
			];
		} else {
			return [
				{ name: "Home", href: "/" },
				{ name: "Projects", href: "/projects" },
				{ name: "Blogs", href: "/blogs" },
				{
					name: token ? "Dashboard" : "Login",
					href: token ? "/dashboard" : "/login",
				},
			];
		}
	};

	// Helper to check if we're on the homepage
	const isHome = pathname === "/" || pathname === "/#home";

	const handleNavClick = (href: string) => {
		setIsOpen(false);
		if (isHome) {
			const element = document.querySelector(href);
			element?.scrollIntoView({ behavior: "smooth" });
		} else {
			window.location.href = `/${href}`;
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-background/70 backdrop-blur-md border-b border-border shadow-card"
					: "bg-transparent"
			}`}
		>
			<nav className="">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="text-2xl font-bold text-gradient"
					>
						Tasbih
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={pathname}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.3 }}
								className="flex items-center space-x-8"
							>
								<NavItems
									items={navItems()}
									handleNavClick={handleNavClick}
								/>

								{token && (
									<Button
										onClick={handleLogout}
										variant="outline"
										size="sm"
										className="btn-glow"
									>
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</Button>
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden p-4 border-t border-border bg-background/75 backdrop-blur-md"
					>
						<div className="flex flex-col space-y-4">
							{(() => {
								const items = navItems();
								const lastInternalIdx = items.findIndex(
									(item, i) =>
										item.href.startsWith("#") &&
										(i + 1 === items.length ||
											!items[i + 1].href.startsWith("#"))
								);

								return items.map((item, i) => (
									<>
										<motion.div
											key={item.name}
											initial={{ x: -20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ delay: 0.1 }}
										>
											{item.href.startsWith("#") ? (
												<button
													className="text-muted-foreground hover:text-foreground transition-colors block"
													onClick={() =>
														handleNavClick(
															item.href
														)
													}
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
											<span className="my-2 h-px w-full border-t border-border" />
										)}
									</>
								));
							})()}

							{token && (
								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
								>
									<Button
										onClick={handleLogout}
										variant="outline"
										size="sm"
										className="w-full btn-glow"
									>
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</Button>
								</motion.div>
							)}
						</div>
					</motion.div>
				)}
			</nav>
		</motion.header>
	);
}
