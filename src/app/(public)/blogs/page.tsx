"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Blog {
	id: string;
	title: string;
	excerpt: string | null;
	thumbnail_url: string | null;
	created_at: string;
	author_id: string;
	profiles: {
		full_name: string | null;
	} | null;
}

const Blogs = () => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBlogs();
	}, []);

	const fetchBlogs = async () => {
		try {
			fetch("/blogs.json")
				.then((res) => res.json())
				.then((data) => setBlogs(data));
		} catch (error: unknown) {
			toast.error("Failed to load blogs");
			console.error("Error fetching blogs:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-20">
					<div className="flex items-center justify-center">
						<p className="text-muted-foreground">
							Loading blogs...
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="min-h-screen">
			<section className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
					<div className="space-y-4">
						<h1 className="text-4xl md:text-5xl font-bold text-gradient">
							Blog
						</h1>
						<p className="text-xl text-muted-foreground">
							Thoughts, tutorials, and insights on web development
						</p>
					</div>

					{blogs.length === 0 ? (
						<Card className="glass-card">
							<CardContent className="p-8 md:p-12 text-center">
								<p className="text-muted-foreground">
									No blog posts yet. Check back soon!
								</p>
							</CardContent>
						</Card>
					) : (
						<div className="space-y-4 md:space-y-6">
							{blogs.map((blog) => (
								<Card
									key={blog.id}
									className="glass-card hover-lift overflow-hidden"
								>
									<div className="md:flex">
										{blog.thumbnail_url && (
											<div className="md:w-64 md:flex-shrink-0 aspect-video md:aspect-square bg-muted overflow-hidden">
												<Image
													src={blog.thumbnail_url}
													alt={blog.title}
													className="w-full h-full object-cover"
												/>
											</div>
										)}

										<div className="flex-1 flex flex-col">
											<CardHeader>
												<h2 className="text-xl md:text-2xl font-bold hover:text-primary transition-colors">
													<Link
														href={`/blogs/${blog.id}`}
													>
														{blog.title}
													</Link>
												</h2>
												<div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
													<Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
													<span className="whitespace-nowrap">
														{format(
															new Date(
																blog.created_at
															),
															"MMM d, yyyy"
														)}
													</span>
													{blog.profiles
														?.full_name && (
														<>
															<span>•</span>
															<span className="truncate">
																{
																	blog
																		.profiles
																		.full_name
																}
															</span>
														</>
													)}
												</div>
											</CardHeader>

											<CardContent className="flex-1">
												<p className="text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3">
													{blog.excerpt ||
														"Read more to discover the full content..."}
												</p>
											</CardContent>

											<CardFooter>
												<Link
													href={`/blogs/${blog.id}`}
												>
													<Button
														variant="outline"
														size="sm"
													>
														Read More
													</Button>
												</Link>
											</CardFooter>
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default Blogs;
