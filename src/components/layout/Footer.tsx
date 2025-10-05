import { Button } from "@/components/ui/button";
import { Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
	{ name: "GitHub", icon: Github, href: "https://github.com/ctasbihas" },
	{
		name: "LinkedIn",
		icon: Linkedin,
		href: "https://linkedin.com/in/ctasbihas",
	},
	{ name: "Twitter", icon: Twitter, href: "https://twitter.com/ctasbihas" },
	{ name: "Email", icon: Mail, href: "mailto:ctasbihas@gmail.com" },
];

const quickLinks = [
	{ name: "Home", href: "/" },
	{ name: "Blogs", href: "/blogs" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "#contact" },
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-card border-t border-border">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand & Description */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-gradient">
							Tasbih
						</h3>
						<p className="text-muted-foreground max-w-md">
							Passionate developer creating innovative solutions
							and sharing knowledge through code. Let&apos;s build
							something amazing together.
						</p>
						<div className="flex space-x-2">
							{socialLinks.map((social) => (
								<Button
									key={social.name}
									variant="ghost"
									size="sm"
									asChild
									className="hover:bg-primary/10 hover:text-primary"
								>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.name}
									>
										<social.icon className="w-5 h-5" />
									</a>
								</Button>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Quick Links</h4>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link
											href={link.href}
										className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Get in Touch</h4>
						<div className="space-y-2 text-muted-foreground">
							<p>📧 ctasbihas@gmail.com</p>
							<p>📱 +880 (1595) 373-760</p>
							<p>📍 Dhaka, Bangladesh</p>
						</div>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-muted-foreground text-sm">
						© {currentYear} Portfolio. All rights reserved.
					</p>
					<p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
						Made by <Heart className="w-4 h-4 mx-1 text-red-500" />{" "}
						@ctasbihas
					</p>
				</div>
			</div>
		</footer>
	);
}
