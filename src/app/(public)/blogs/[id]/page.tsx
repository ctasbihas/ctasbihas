"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface Blog {
	id: string;
	title: string;
	content: string;
	thumbnail_url: string | null;
	created_at: string;
	updated_at: string;
	profiles: {
		full_name: string | null;
	} | null;
}

export default function BlogPost() {
	const { id } = useParams<{ id: string }>();
	const [blog, setBlog] = useState<Blog | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			fetch("/blogs.json")
				.then((res) => res.json())
				.then((data) => {
					const foundBlog = data.find((blog: Blog) => blog.id === id);
					setBlog(foundBlog || null);
					setLoading(false);
				});
		} catch (error: unknown) {
			toast.error("Failed to load blog post");
			console.error("Error fetching blog:", error);
			setLoading(false);
		}
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-20">
					<div className="flex items-center justify-center">
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-20">
					<div className="max-w-3xl mx-auto text-center space-y-4">
						<h1 className="text-3xl font-bold">
							Blog Post Not Found
						</h1>
						<Link href="/blogs">
							<Button
								variant="outline"
								className="gap-2"
							>
								<ArrowLeft className="h-4 w-4" />
								Back to Blogs
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<article className="container mx-auto px-4 py-20">
				<div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
					<Link href="/blogs">
						<Button
							variant="ghost"
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Blogs
						</Button>
					</Link>

					{blog.thumbnail_url && (
						<div className="aspect-video rounded-lg overflow-hidden bg-muted">
							<Image
								src={blog.thumbnail_url}
								alt={blog.title}
								className="w-full h-full object-cover"
								width={1000}
								height={1000}
							/>
						</div>
					)}

					<div className="space-y-4">
						<h1 className="text-4xl md:text-5xl font-bold">
							{blog.title}
						</h1>

						<div className="flex items-center gap-4 text-muted-foreground">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<span>
									{format(
										new Date(blog.created_at),
										"MMMM d, yyyy"
									)}
								</span>
							</div>
							{blog.profiles?.full_name && (
								<>
									<span>•</span>
									<span>{blog.profiles.full_name}</span>
								</>
							)}
						</div>
					</div>

					<div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-accent-foreground prose-pre:p-0 prose-pre:bg-transparent">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								code({
									inline,
									className,
									children,
									...props
								}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
								any) {
									const match = /language-(\w+)/.exec(
										className || ""
									);
									return !inline && match ? (
										<div className="overflow-x-auto max-w-full my-4 rounded-lg">
											<SyntaxHighlighter
												style={oneDark}
												language={match[1]}
												PreTag="div"
												customStyle={{
													margin: 0,
													borderRadius: "0.5rem",
													fontSize: "0.875rem",
													maxWidth: "100%",
												}}
												{...props}
											>
												{String(children).replace(
													/\n$/,
													""
												)}
											</SyntaxHighlighter>
										</div>
									) : (
										<code
											className="bg-muted px-1.5 py-0.5 rounded text-sm"
											{...props}
										>
											{children}
										</code>
									);
								},
							}}
						>
							{blog.content}
						</ReactMarkdown>
					</div>
				</div>
			</article>
		</div>
	);
}
