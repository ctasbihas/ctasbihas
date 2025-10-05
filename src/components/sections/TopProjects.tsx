"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const topProjects = [
  {
    id: 1,
    title: "ZipRide",
    description:
      "ZipRide is a production-grade, fully responsive, and role-based ride booking platform inspired by Uber and Pathao. Built with React, Redux Toolkit, and RTK Query, it delivers tailored experiences for Riders, Drivers, and Admins, ensuring a polished, intuitive, and consistent UI/UX across all devices.",
    technologies: ["React", "Node.js", "MongoDB", "SSL Commerz", "Redux"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://zipride.vercel.app/",
    githubUrl: "https://github.com/ctasbihas/zipride_frontend",
  },
  {
    id: 2,
    title: "Doctors Portal",
    description:
      "Doctors Portal is a web application for booking medical appointments and managing schedules. Built with React and Firebase, it offers real-time updates, secure authentication, and a user-friendly interface for both patients and doctors.",
    technologies: ["React", "Firebase", "Daisy UI", "React Router"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://doctors-portal-48670.web.app/",
    githubUrl: "https://github.com/ctasbihas/doctors-portal-client",
  },
  {
    id: 3,
    title: "Librium",
    description:
      "The Minimal Library Management System is a client-side app built with React, Redux Toolkit Query (RTK Query), and TypeScript. No user authentication — just pure focus on core library functionalities like book management & borrowing.",
    technologies: ["React", "Weather API", "Chart.js", "Geolocation"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://mylibrium.vercel.app",
    githubUrl: "https://github.com/ctasbihas/librium",
  },
];

export default function TopProjects() {
  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Top Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A showcase of my recent work, demonstrating expertise in modern web
            technologies and problem-solving approaches.
          </p>
          <Link href="/projects">
            <Button variant="outline" className="btn-glow">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300 group h-full overflow-hidden">
                <div className="relative">
                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-50">🚀</div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href={`/projects/${project.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
