import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const blogs = [
	{
		title: "Understanding React Hooks",
		date: "2024-06-01",
		summary:
			"A quick introduction to React Hooks and how they simplify state management in functional components.",
	},
	{
		title: "TypeScript Tips for Beginners",
		date: "2024-05-20",
		summary:
			"Learn some useful TypeScript tricks to write safer and more maintainable code.",
	},
	{
		title: "Getting Started with Next.js",
		date: "2024-05-10",
		summary:
			"A beginner's guide to building fast and scalable web apps using Next.js.",
	},
	{
		title: "Mastering CSS Grid",
		date: "2024-04-28",
		summary:
			"Explore the power of CSS Grid for building modern, responsive layouts.",
	},
	{
		title: "Deploying with Vercel",
		date: "2024-04-15",
		summary:
			"Step-by-step guide to deploying your web projects using Vercel.",
	},
	{
		title: "Optimizing React Performance",
		date: "2024-03-30",
		summary:
			"Tips and techniques to make your React apps faster and more efficient.",
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.12 },
	}),
};

const Blog = () => {
	return (
		<div className="max-w-3xl mx-auto py-12 px-4">
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-4xl font-bold mb-8 text-center"
			>
				Programming Blog
			</motion.h1>
			<div className="grid gap-6">
				{blogs.map((blog, idx) => (
					<motion.div
						key={idx}
						custom={idx}
						initial="hidden"
						animate="visible"
						variants={cardVariants}
						whileHover={{
							scale: 1.03,
							boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
						}}
					>
						<Card className="transition-shadow duration-300 hover:shadow-lg">
							<CardHeader>
								<CardTitle className="text-2xl">
									{blog.title}
								</CardTitle>
								<span className="text-xs text-muted-foreground">
									{blog.date}
								</span>
							</CardHeader>
							<CardContent>
								<p className="text-base text-muted-foreground">
									{blog.summary}
								</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Blog;
