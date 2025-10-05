"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Project[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStacks: string[];
  urls: {
    frontend: string;
    backend: string;
    githubFrontend: string;
    githubBackend: string;
  };
  bannerImage: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    techStacks: "",
    frontend: "",
    backend: "",
    githubFrontend: "",
    githubBackend: "",
    bannerImage: "",
    status: "In Progress",
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `https://portfolio-backend-nu-six.vercel.app/api/v1/projects`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const result: ApiResponse = await response.json();

      if (result.success) {
        setProjects([...result.data] || []);
      } else {
        throw new Error(result.message || "Failed to load projects");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title: formData.title,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      techStacks: formData.techStacks
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      urls: {
        frontend: formData.frontend || "",
        backend: formData.backend || "",
        githubFrontend: formData.githubFrontend || "",
        githubBackend: formData.githubBackend || "",
      },
      bannerImage: formData.bannerImage || "",
      status: formData.status,
      featured: formData.featured,
    };

    try {
      const url = editingProject
        ? `https://portfolio-backend-nu-six.vercel.app/api/v1/projects/${editingProject._id}`
        : "https://portfolio-backend-nu-six.vercel.app/api/v1/projects";

      const method = editingProject ? "PATCH" : "POST";
      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editingProject ? "update" : "create"} project`
        );
      }

      const result = await response.json();

      if (result.success) {
        toast.success(
          editingProject
            ? "Project updated successfully"
            : "Project created successfully"
        );
        setDialogOpen(false);
        resetForm();
        fetchProjects();
      } else {
        throw new Error(result.message || "Operation failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      techStacks: project.techStacks.join(", "),
      frontend: project.urls.frontend || "",
      backend: project.urls.backend || "",
      githubFrontend: project.urls.githubFrontend || "",
      githubBackend: project.urls.githubBackend || "",
      bannerImage: project.bannerImage || "",
      status: project.status,
      featured: project.featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://portfolio-backend-nu-six.vercel.app/api/v1/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        throw new Error(result.message || "Failed to delete project");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      longDescription: "",
      techStacks: "",
      frontend: "",
      backend: "",
      githubFrontend: "",
      githubBackend: "",
      bannerImage: "",
      status: "In Progress",
      featured: false,
    });
    setEditingProject(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient">
            Projects Management
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 hover-scale">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longDescription">
                  Long Description (Markdown) *
                </Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longDescription: e.target.value,
                    })
                  }
                  rows={6}
                  placeholder="Supports Markdown formatting..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStacks">
                  Tech Stacks (comma-separated) *
                </Label>
                <Input
                  id="techStacks"
                  value={formData.techStacks}
                  onChange={(e) =>
                    setFormData({ ...formData, techStacks: e.target.value })
                  }
                  placeholder="Next.js, TypeScript, Tailwind CSS"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frontend">Frontend URL</Label>
                  <Input
                    id="frontend"
                    type="url"
                    value={formData.frontend}
                    onChange={(e) =>
                      setFormData({ ...formData, frontend: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backend">Backend URL</Label>
                  <Input
                    id="backend"
                    type="url"
                    value={formData.backend}
                    onChange={(e) =>
                      setFormData({ ...formData, backend: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubFrontend">GitHub Frontend</Label>
                  <Input
                    id="githubFrontend"
                    type="url"
                    value={formData.githubFrontend}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        githubFrontend: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubBackend">GitHub Backend</Label>
                  <Input
                    id="githubBackend"
                    type="url"
                    value={formData.githubBackend}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        githubBackend: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image URL</Label>
                <Input
                  id="bannerImage"
                  type="url"
                  value={formData.bannerImage}
                  onChange={(e) =>
                    setFormData({ ...formData, bannerImage: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured">Featured Project</Label>
                  <div className="flex items-center h-10">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm">
                      Mark as featured
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? "Update" : "Create"} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tech Stacks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.title}</span>
                      {project.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 flex items-center gap-1"
                        >
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.techStacks.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStacks.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.techStacks.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                          : project.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                          : "bg-gray-500/20 text-gray-600 hover:bg-gray-500/30"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {project.urls.githubFrontend && (
                        <a
                          href={project.urls.githubFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          title="GitHub Frontend"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.urls.githubBackend && (
                        <a
                          href={project.urls.githubBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          title="GitHub Backend"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.urls.frontend && (
                        <a
                          href={project.urls.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                          title="Live Frontend"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.urls.backend && (
                        <a
                          href={project.urls.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                          title="Live Backend"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        className="hover-scale"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project._id)}
                        className="hover-scale text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    No projects yet. Create your first project!
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
