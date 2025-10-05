"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Palette, Users, Zap } from "lucide-react";

const highlights = [
	{
		icon: Code,
		title: "Clean Code",
		description:
			"Writing maintainable, scalable, and efficient code following best practices.",
	},
	{
		icon: Palette,
		title: "Design Focus",
		description:
			"Creating beautiful, intuitive user interfaces with attention to detail.",
	},
	{
		icon: Zap,
		title: "Performance",
		description:
			"Optimizing applications for speed, accessibility, and user experience.",
	},
	{
		icon: Users,
		title: "Collaboration",
		description:
			"Working effectively with cross-functional teams to deliver results.",
	},
];

export default function About() {
	return (
		<section
			id="about"
			className="section-padding bg-muted/30"
		>
			<div className="container mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
						About Me
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						I&apos;m a passionate web developer with 2+ years of
						experience crafting digital solutions. I love turning
						complex problems into simple, beautiful, and intuitive
						designs.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Personal Story */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-6"
					>
						<h3 className="text-2xl font-semibold mb-4">
							My Journey
						</h3>
						<div className="space-y-4 text-muted-foreground leading-relaxed">
							<p>
								My path into development began during the
								Covid-19 arc, where I discovered a passion for
								crafting digital experiences. What started as
								curiosity soon grew into a drive to build
								applications that have a meaningful impact.
							</p>
							<p>
								Over the years, I&apos;ve worked on many
								projects, from landing pages to chat
								applications. Some I left behind incomplete, but
								each taught me valuable lessons. I specialize in
								using modern web technologies to transform
								concepts into effective digital solutions. I
								enjoy continuous learning and embracing new
								challenges in the fast-paced world of
								technology.
							</p>
							<p>
								When I&apos;m not coding, you&apos;ll find me
								exploring new technologies, contributing to open
								source projects, or sharing my knowledge through
								blog posts and community engagement.
							</p>
						</div>
					</motion.div>

					{/* Highlights Grid */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-2 gap-6"
					>
						{highlights.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
								viewport={{ once: true }}
							>
								<Card className="card-gradient border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
									<CardContent className="p-6 text-center">
										<div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
											<item.icon className="w-6 h-6 text-primary" />
										</div>
										<h4 className="font-semibold mb-2">
											{item.title}
										</h4>
										<p className="text-sm text-muted-foreground">
											{item.description}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
				>
					{[
						{ number: "50+", label: "Projects Completed" },
						{ number: "2+", label: "Years Experience" },
						{ number: "25+", label: "Happy Clients" },
						{ number: "100%", label: "Commitment" },
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="space-y-2"
						>
							<div className="text-3xl md:text-4xl font-bold text-gradient">
								{stat.number}
							</div>
							<div className="text-muted-foreground text-sm">
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
