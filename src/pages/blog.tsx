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
];

const Blog = () => {
	return (
		<div>
			<h1>Programming Blog</h1>
			<ul>
				{blogs.map((blog, idx) => (
					<li
						key={idx}
						style={{ marginBottom: "1.5rem" }}
					>
						<h2>{blog.title}</h2>
						<small>{blog.date}</small>
						<p>{blog.summary}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Blog;
