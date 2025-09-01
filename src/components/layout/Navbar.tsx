import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

// Temporary navItems
const navItems = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// For demo, use window.location.pathname
	const [pathname, setPathname] = useState(
		typeof window !== "undefined" ? window.location.pathname : "/"
	);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavClick = (href: string) => {
		setIsOpen(false);
		if (href.startsWith("#")) {
			const element = document.querySelector(href);
			element?.scrollIntoView({ behavior: "smooth" });
		} else {
			// For demo, update pathname
			setPathname(href);
		}
	};

	const downloadResume = () => {
		const link = document.createElement("a");
		link.href = "/resume.pdf";
		link.download = "resume.pdf";
		link.click();
	};

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-background/95 backdrop-blur-md border-b border-border shadow-card"
					: "bg-transparent"
			}`}
		>
			<nav className="">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					{/* Logo */}
					<Link
						to="/"
						className="text-2xl font-bold text-gradient"
					>
						Tasbih
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<motion.div
								key={item.name}
								whileHover={{ y: -2 }}
							>
								<button
									onClick={() => handleNavClick(item.href)}
									className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
								>
									{item.name}
								</button>
							</motion.div>
						))}

						<Button
							onClick={downloadResume}
							variant="outline"
							size="sm"
							className="btn-glow"
						>
							<Download className="w-4 h-4 mr-2" />
							Resume
						</Button>
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
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden p-4 border-t border-border bg-background/75 backdrop-blur-md"
						>
							<div className="flex flex-col space-y-4">
								{navItems.map((item) => (
									<motion.div
										key={item.name}
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.1 }}
									>
										<button
											className="text-muted-foreground hover:text-foreground transition-colors block"
											onClick={() =>
												handleNavClick(item.href)
											}
										>
											{item.name}
										</button>
									</motion.div>
								))}
								<Button
									onClick={downloadResume}
									variant="outline"
									size="sm"
									className="btn-glow self-start"
								>
									<Download className="w-4 h-4 mr-2" />
									Resume
								</Button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</motion.header>
	);
}
