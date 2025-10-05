"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	BookOpen,
	FolderGit2,
	LayoutDashboard,
	Menu,
	UserCircle,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";

const navItems = [
	{ title: "Home", path: "/dashboard", icon: LayoutDashboard, end: true },
	{ title: "Users", path: "/dashboard/users", icon: Users },
	{ title: "Projects", path: "/dashboard/projects", icon: FolderGit2 },
	{ title: "Blogs", path: "/dashboard/blogs", icon: BookOpen },
	{ title: "About Me", path: "/dashboard/about", icon: UserCircle },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	if (!token) {
		if (typeof window !== "undefined") {
			window.location.href = "/";
		}
		return null;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Top Bar */}
			<header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-b z-50">
				<div className="flex items-center justify-between h-full px-4">
					<div className="flex items-center gap-2 md:gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="hover-scale"
						>
							{sidebarOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
						<h1 className="text-lg md:text-2xl font-bold text-gradient">
							Admin Dashboard
						</h1>
					</div>
					<Link
						href="/"
						className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						← Back
					</Link>
				</div>
			</header>

			<div className="flex pt-16">
				{/* Sidebar - Hidden on mobile when closed */}
				<aside
					className={cn(
						"fixed left-0 top-16 bottom-0 bg-card/95 backdrop-blur-sm border-r transition-all duration-300 z-40 overflow-y-auto",
						sidebarOpen
							? "w-64 translate-x-0"
							: "w-64 -translate-x-full md:w-16 md:translate-x-0"
					)}
				>
					<nav className="p-2 md:p-4 space-y-2">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={cn(
									"flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-all duration-200",
									"hover:bg-primary/10 hover:translate-x-1 group",
									"text-muted-foreground",
									!sidebarOpen && "md:justify-center md:px-0"
								)}
							>
								<item.icon className="h-5 w-5 group-hover:scale-110 transition-transform flex-shrink-0" />
								<span
									className={cn(
										"transition-opacity duration-200",
										!sidebarOpen && "md:hidden"
									)}
								>
									{item.title}
								</span>
							</Link>
						))}
					</nav>
				</aside>

				{/* Overlay for mobile */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Main Content */}
				<main
					className={cn(
						"flex-1 transition-all duration-300 min-h-screen",
						sidebarOpen ? "md:ml-64" : "md:ml-16"
					)}
				>
					<div className="p-4 md:p-6 animate-fade-in">{children}</div>
				</main>
			</div>
		</div>
	);
}
