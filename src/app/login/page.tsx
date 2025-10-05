"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginForm = { email: string; password: string };

export default function LoginPage() {
	const { register, handleSubmit } = useForm<LoginForm>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: LoginForm) => {
		setLoading(true);
		try {
			const res = await fetch(
				"https://portfolio-backend-nu-six.vercel.app/api/v1/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			const json = await res.json();
			if (!json.success) {
				toast.error(json?.error || "Login failed");
				setLoading(false);
				return;
			}
			console.log(json);
			// store token for demo purposes (not secure)
			localStorage.setItem("token", json.data.token);
			toast.success("Logged in");
			router.push("/dashboard");
		} catch (err) {
			console.error(err);
			toast.error("Network error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="pt-20">
			<section className="section-padding">
				<div className="container mx-auto max-w-md">
					<h1 className="text-3xl font-bold mb-6">Login</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<Input
							placeholder="Email"
							type="email"
							{...register("email", { required: true })}
						/>
						<Input
							placeholder="Password"
							type="password"
							{...register("password", { required: true })}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>
					<div className="mt-4 text-sm">
						Don&apos;t have an account?{" "}
						<a
							href="/signup"
							className="text-primary"
						>
							Sign up
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
