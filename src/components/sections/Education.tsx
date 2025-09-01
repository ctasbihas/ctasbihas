import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, BookOpen, Calendar, MapPin } from "lucide-react";

const education = [
	{
		id: 1,
		degree: "Bachelor of Science in Computer Science",
		institution: "Stanford University",
		location: "Stanford, CA",
		period: "2018 - 2022",
		gpa: "3.8/4.0",
		status: "Graduated Magna Cum Laude",
		description:
			"Comprehensive study of computer science fundamentals with focus on software engineering, algorithms, and data structures. Active member of the Computer Science Society and hackathon organizer.",
		coursework: [
			"Data Structures and Algorithms",
			"Database Systems",
			"Software Engineering",
			"Computer Networks",
			"Machine Learning",
			"Web Development",
			"Mobile App Development",
			"Computer Graphics",
		],
		achievements: [
			"Dean's List for 6 consecutive semesters",
			"Winner of Stanford Hackathon 2021",
			"President of Computer Science Society (2021-2022)",
			"Teaching Assistant for Introduction to Programming (2020-2021)",
			"Published research paper on web accessibility",
		],
		projects: [
			"Capstone: AI-powered study assistant web application",
			"Group Project: E-commerce platform with React and Node.js",
			"Research: Web accessibility optimization techniques",
		],
	},
	{
		id: 2,
		degree: "Associate Degree in Web Development",
		institution: "Community College of San Francisco",
		location: "San Francisco, CA",
		period: "2016 - 2018",
		gpa: "3.9/4.0",
		status: "Graduated Summa Cum Laude",
		description:
			"Intensive program focused on practical web development skills and industry best practices. Gained hands-on experience with modern web technologies and frameworks.",
		coursework: [
			"HTML5 and CSS3",
			"JavaScript Programming",
			"Responsive Web Design",
			"PHP and MySQL",
			"Web Design Principles",
			"E-commerce Development",
			"Content Management Systems",
		],
		achievements: [
			"Valedictorian of graduating class",
			"Outstanding Student Award in Web Development",
			"Completed 3 internships during the program",
			"Built 15+ websites for local businesses as part of curriculum",
		],
		projects: [
			"Final Project: Full-stack restaurant management system",
			"Portfolio: Responsive portfolio website with animations",
			"Community Service: Website for local non-profit organization",
		],
	},
];

const certifications = [
	{
		name: "AWS Certified Solutions Architect",
		issuer: "Amazon Web Services",
		date: "2023",
		credential: "ASA-C01",
		status: "Active",
	},
	{
		name: "Google Analytics Certified",
		issuer: "Google",
		date: "2023",
		credential: "GA-2023-001",
		status: "Active",
	},
	{
		name: "Meta Frontend Developer Professional",
		issuer: "Meta",
		date: "2022",
		credential: "META-FE-2022",
		status: "Active",
	},
	{
		name: "Certified Kubernetes Administrator",
		issuer: "Cloud Native Computing Foundation",
		date: "2022",
		credential: "CKA-2022-001",
		status: "Active",
	},
];

export default function Education() {
	return (
		<section
			id="education"
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
						Education & Certifications
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						My academic journey and professional certifications that
						have shaped my technical expertise and problem-solving
						approach.
					</p>
				</motion.div>

				{/* Education */}
				<div className="mb-16">
					<motion.h3
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-2xl font-semibold mb-8 flex items-center"
					>
						<BookOpen className="w-6 h-6 mr-3 text-primary" />
						Academic Background
					</motion.h3>

					<div className="max-w-4xl mx-auto space-y-8">
						{education.map((edu, index) => (
							<motion.div
								key={edu.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
								viewport={{ once: true }}
							>
								<Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300">
									<CardHeader>
										<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
											<div className="flex-1">
												<CardTitle className="text-xl mb-2">
													{edu.degree}
												</CardTitle>
												<div className="text-primary font-semibold mb-2">
													{edu.institution}
												</div>
												<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-2">
													<div className="flex items-center">
														<Calendar className="w-4 h-4 mr-1" />
														{edu.period}
													</div>
													<span className="hidden sm:inline">
														•
													</span>
													<div className="flex items-center">
														<MapPin className="w-4 h-4 mr-1" />
														{edu.location}
													</div>
												</div>
												<div className="flex flex-wrap gap-2">
													<Badge
														variant="outline"
														className="text-xs"
													>
														GPA: {edu.gpa}
													</Badge>
													<Badge
														variant="default"
														className="text-xs bg-green-500"
													>
														{edu.status}
													</Badge>
												</div>
											</div>
										</div>
									</CardHeader>

									<CardContent className="space-y-6">
										<p className="text-muted-foreground leading-relaxed">
											{edu.description}
										</p>

										<div>
											<h4 className="font-semibold mb-3">
												Relevant Coursework:
											</h4>
											<div className="flex flex-wrap gap-2">
												{edu.coursework.map(
													(course) => (
														<Badge
															key={course}
															variant="secondary"
															className="text-xs"
														>
															{course}
														</Badge>
													)
												)}
											</div>
										</div>

										<div>
											<h4 className="font-semibold mb-3">
												Key Achievements:
											</h4>
											<ul className="space-y-2">
												{edu.achievements.map(
													(
														achievement,
														achievementIndex
													) => (
														<li
															key={
																achievementIndex
															}
															className="flex items-start"
														>
															<Award className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
															<span className="text-muted-foreground text-sm">
																{achievement}
															</span>
														</li>
													)
												)}
											</ul>
										</div>

										<div>
											<h4 className="font-semibold mb-3">
												Notable Projects:
											</h4>
											<ul className="space-y-2">
												{edu.projects.map(
													(project, projectIndex) => (
														<li
															key={projectIndex}
															className="flex items-start"
														>
															<span className="text-primary mr-2 mt-1 flex-shrink-0">
																•
															</span>
															<span className="text-muted-foreground text-sm">
																{project}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>

				{/* Certifications */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
				>
					<h3 className="text-2xl font-semibold mb-8 flex items-center">
						<Award className="w-6 h-6 mr-3 text-primary" />
						Professional Certifications
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{certifications.map((cert, index) => (
							<motion.div
								key={cert.name}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								viewport={{ once: true }}
							>
								<Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
									<CardContent className="p-6">
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<h4 className="font-semibold mb-1">
													{cert.name}
												</h4>
												<p className="text-primary text-sm font-medium">
													{cert.issuer}
												</p>
											</div>
											<Badge
												variant="default"
												className="bg-green-500 text-xs"
											>
												{cert.status}
											</Badge>
										</div>
										<div className="text-sm text-muted-foreground mb-2">
											Issued: {cert.date}
										</div>
										<div className="text-xs text-muted-foreground">
											Credential ID: {cert.credential}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Learning Philosophy */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<Card className="card-gradient border-border/50 max-w-3xl mx-auto">
						<CardContent className="p-8">
							<h3 className="text-xl font-semibold mb-4 text-gradient">
								Continuous Learning Philosophy
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Technology evolves rapidly, and I believe in
								lifelong learning. I regularly participate in
								online courses, attend tech conferences,
								contribute to open-source projects, and stay
								updated with the latest industry trends. My goal
								is to continuously expand my knowledge and
								skills to deliver innovative solutions and
								mentor the next generation of developers.
							</p>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
