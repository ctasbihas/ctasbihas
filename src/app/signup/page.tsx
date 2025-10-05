"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignupForm = { email: string; password: string; fullName?: string };

export default function SignupPage() {
	const { register, handleSubmit } = useForm<SignupForm>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: SignupForm) => {
		setLoading(true);
		try {
			const res = await fetch(
				"https://portfolio-backend-nu-six.vercel.app/api/v1/auth/signup",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			const json = await res.json();
			if (!res.ok) {
				toast.error(json?.error || "Signup failed");
				setLoading(false);
				return;
			}
			toast.success("Account created. Please login.");
			router.push("/login");
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
					<h1 className="text-3xl font-bold mb-6">Sign Up</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<Input
							placeholder="Full name"
							{...register("fullName")}
						/>
						<Input
							placeholder="Email"
							type="email"
							{...register("email", { required: true })}
						/>
						<Input
							placeholder="Password"
							type="password"
							{...register("password", {
								required: true,
								minLength: 8,
							})}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading ? "Creating..." : "Create account"}
						</Button>
					</form>
					<div className="mt-4 text-sm">
						Already have an account?{" "}
						<a
							href="/login"
							className="text-primary"
						>
							Sign in
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
