"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  published: boolean;
  created_at: string;
}

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    thumbnail_url: "",
    published: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error("Failed to load blogs");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      thumbnail_url: "",
      published: false,
    });
  };

  const handleEdit = (blog: Blog) => {
    setIsCreating(false);
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      thumbnail_url: blog.thumbnail_url || "",
      published: blog.published,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      thumbnail_url: "",
      published: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    try {
      const blogData = {
        ...formData,
        author_id: user.id,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingBlog.id);

        if (error) throw error;
        toast.success("Blog updated successfully!");
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);

        if (error) throw error;
        toast.success("Blog created successfully!");
      }

      handleCancel();
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to save blog");
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error: any) {
      toast.error("Failed to delete blog");
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  if (isCreating || editingBlog) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</CardTitle>
          <CardDescription>
            {editingBlog ? "Update your blog post" : "Write a new blog post"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
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
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="A short description..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL (Optional)</Label>
              <Input
                id="thumbnail"
                type="url"
                value={formData.thumbnail_url}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail_url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="bg-background rounded-md">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="min-h-[300px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>

          <CardFooter className="gap-2">
            <Button type="submit">
              {editingBlog ? "Update Blog" : "Create Blog"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient">Blogs Management</h2>
        <p className="text-muted-foreground mt-2">
          Create and manage your blog posts
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Blogs</h2>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Blog
          </Button>
        </div>

        {blogs.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No blogs yet. Create your first one!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription>
                        {blog.published ? (
                          <span className="text-green-500">Published</span>
                        ) : (
                          <span className="text-yellow-500">Draft</span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {blog.excerpt && (
                  <CardContent>
                    <p className="text-muted-foreground">{blog.excerpt}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
