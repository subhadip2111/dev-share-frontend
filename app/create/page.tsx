
"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, MessageSquare, Lightbulb, BookOpen, X } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";
import { createPost } from "@/utils/post";
import { useRouter } from "next/navigation";

const postTypes = [
  { id: "interview", label: "Interview Experience", icon: MessageSquare, description: "Share questions from your interviews" },
  { id: "tutorial", label: "Tutorial/Documentation", icon: BookOpen, description: "Technical guides and documentation" },
  { id: "project", label: "Project Idea", icon: Lightbulb, description: "Collaborate on project concepts" },
  { id: "article", label: "Article/Blog", icon: FileText, description: "Share knowledge and insights" }
];

const categories = [
  "Frontend", "Backend", "Fullstack", "AI & ML", "DevOps", "Mobile", "Database", "Security"
];

const CreatePost = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("article");
  const [postStatus,setPostStatus]=useState("published");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || !excerpt) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("accessToken");
    console.log(currentUser)
    let postData={
      type: selectedType,
      title,
      category,
      content,
      tags,
      token,
      excerpt
    }
    console.log("Post Data:", postData);
try {
    const result = await createPost(postData);
    if (result?.data) {
      toast.success("Post published successfully!");
      router.push("/explore"); 
    } else {
      toast.error("Failed to publish post.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }


  };
  const savePostAsDraft =async  (e: React.FormEvent) => {
    setPostStatus("draft");
     e.preventDefault();
    if (!title || !category || !content || !excerpt) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("accessToken");
    console.log(currentUser)
    let postData={
      type: selectedType,
      title,
      category,
      content,
      tags,
      token,
      status:postStatus,
      excerpt
    }
try {
    const result = await createPost(postData);
    if (result?.data) {
      toast.success("saved as Draft successfully!");
      router.push("/explore"); 
    } else {
      toast.error("Failed to draft post.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Create New Post</h1>
          <p className="text-lg text-muted-foreground">
            Share your knowledge, experiences, and ideas with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>What would you like to share?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedType === type.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{type.label}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Post Details */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
                  <div className="space-y-2">
                <Label htmlFor="excerpt">  excerpt *</Label>
                <Input
                  id="excerpt"
                  placeholder="Enter a descriptive excerpt..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add tags (press Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor value={content} onChange={setContent} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
  <Button type="button" variant="outline" onClick={savePostAsDraft}>
    Save Draft
  </Button>
  <Button type="submit">
    Publish Post
  </Button>
</div>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;
