"use client";

import { allProjects } from "../../../../../public/assets/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const project = allProjects.find((proj) => proj.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!project) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen bg-background"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="max-w-md w-full shadow-lg border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-destructive">
              Project Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              The project you are looking for does not exist.
            </p>
            <Button variant="secondary" onClick={() => navigate.back()}>
              Return
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="max-w-2xl w-full shadow-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            {project.title}
          </CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline">{project.status}</Badge>
            <Badge variant="default">{project.date}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-4">
            {project.description}
          </p>
          <p className="mb-6">{project.longDescription}</p>
          <div className="mb-6">
            <span className="font-semibold text-sm text-foreground">
              Technologies:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <Button asChild variant="default">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
          <Button variant="secondary" onClick={() => navigate.back()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectDetails;
