
"use client";

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Database, Brain, Layers, MessageSquare, Lightbulb, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { id: "frontend", name: "Frontend", icon: Code, count: 234, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "backend", name: "Backend", icon: Database, count: 189, color: "bg-green-50 text-green-700 border-green-200" },
  { id: "fullstack", name: "Fullstack", icon: Layers, count: 156, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "ai-ml", name: "AI & ML", icon: Brain, count: 298, color: "bg-orange-50 text-orange-700 border-orange-200" },
];

const featuredPosts = [
  {
    id: 1,
    title: "React Hooks Interview Questions Asked at Google",
    excerpt: "A comprehensive list of React Hooks questions from my recent Google interview experience...",
    author: "Sarah Chen",
    category: "Frontend",
    readTime: "8 min",
    likes: 234,
    comments: 45,
    date: "2 days ago",
    tags: ["React", "Interview", "Google"]
  },
  {
    id: 2,
    title: "Building Scalable Microservices with Node.js",
    excerpt: "Learn how to design and implement microservices architecture that scales to millions of users...",
    author: "Mike Johnson",
    category: "Backend",
    readTime: "12 min",
    likes: 456,
    comments: 89,
    date: "1 day ago",
    tags: ["Node.js", "Microservices", "Architecture"]
  },
  {
    id: 3,
    title: "My Journey Learning Machine Learning - Complete Roadmap",
    excerpt: "From zero to ML engineer: resources, projects, and lessons learned along the way...",
    author: "Priya Sharma",
    category: "AI & ML",
    readTime: "15 min",
    likes: 789,
    comments: 123,
    date: "3 days ago",
    tags: ["Machine Learning", "Career", "Guide"]
  },
];

const Home = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Share Knowledge,
              <br />
              Grow Together
            </h1>
            <p className="text-xl text-muted-foreground">
              A community-driven platform for developers to share interview experiences,
              technical documentation, project ideas, and get help from peers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">



              {/* /create */}
              <Button size="lg" className="gap-2" onClick={() => {
                if (accessToken) {
                  window.location.href = "/create";
                } else {
                  window.location.href = "/auth";
                }
              }}>
                Start Writing
                <ArrowRight className="h-4 w-4" />
              </Button>


              <Button size="lg" variant="outline" onClick={() => {
                if (accessToken) {
                  window.location.href = "/explore";
                } else {
                  window.location.href = "/auth";
                }
              }}>
                Explore Posts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <Link href="/explore">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/explore?category=${category.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${category.color} border`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Posts</h2>
              <p className="text-muted-foreground">Trending content from our community</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments}
                        </span>
                        <span>❤️ {post.likes}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What would you like to share?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/create?type=interview">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <CardTitle>Interview Experience</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Share questions and insights from your interviews
                    </p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/create?type=project">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Lightbulb className="h-8 w-8" />
                    </div>
                    <CardTitle>Project Ideas</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Collaborate on innovative project concepts
                    </p>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <CardTitle>Ask Community</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Get help from fellow developers
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
