"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
      "Redux Toolkit",
      "Responsive Design",
      "Accessibility (WCAG)",
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express.js",
      "Passport JS",
      "REST APIs",
      "JWT Authentication",
      "Database Design",
      "API Integration",
      "Microservices",
    ],
  },
  {
    title: "Database & Cloud",
    icon: "☁️",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Firebase",
      "Supabase",
      "CI/CD",
      "Vercel",
      "Netlify",
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Figma",
      "Testing Library",
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use
            to build exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-sm py-1 px-3 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Core Proficiencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { skill: "Frontend Development", level: 95 },
              { skill: "Backend Development", level: 85 },
              { skill: "UI/UX Design", level: 80 },
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-primary font-semibold">
                    {item.level}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${item.level}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1 + 0.5,
                    }}
                    viewport={{ once: true }}
                    className="bg-hero-gradient h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
