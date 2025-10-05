"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Calendar, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Profile {
	id: string;
	name: string | null;
	email: string | null;
	createdAt: string;
}

interface ApiResponse {
	success: boolean;
	message: string;
	data: Profile[];
}

export default function DashboardUsers() {
	const [users, setUsers] = useState<Profile[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await fetch(
				"https://portfolio-backend-nu-six.vercel.app/api/v1/users"
			);

			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}

			const result: ApiResponse = await response.json();

			if (result.success) {
				setUsers(result.data || []);
			} else {
				throw new Error(result.message || "Failed to load users");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error("Failed to load users");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getInitials = (name: string | null) => {
		if (!name || !name.trim()) return "U";
		const parts = name
			.trim()
			.split(" ")
			.filter((part) => part.length > 0);
		if (parts.length === 0) return "U";
		return parts
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className="text-muted-foreground">Loading users...</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold text-gradient">
						Users Management
					</h2>
					<p className="text-muted-foreground mt-2">
						Manage all registered users
					</p>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Users className="h-4 w-4" />
					<span>{users.length} Total Users</span>
				</div>
			</div>

			<Card className="glass-card animate-fade-in">
				<CardHeader>
					<CardTitle>All Users</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Full Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Joined Date</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((profile) => (
								<TableRow
									key={profile.id}
									className="hover:bg-muted/50 transition-colors"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarFallback className="bg-primary/20 text-primary font-semibold">
													{getInitials(profile.name)}
												</AvatarFallback>
											</Avatar>
										</div>
									</TableCell>
									<TableCell className="font-medium">
										{profile.name || "Not set"}
									</TableCell>
									<TableCell className="text-sm text-muted-foreground">
										{profile.email || "No email"}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar className="h-3 w-3" />
											{new Date(
												profile.createdAt
											).toLocaleDateString()}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant="secondary"
											className="bg-green-500/20 text-green-600 hover:bg-green-500/30"
										>
											Active
										</Badge>
									</TableCell>
								</TableRow>
							))}
							{users.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center text-muted-foreground py-8"
									>
										No users found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
