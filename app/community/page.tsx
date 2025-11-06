
"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import NewDiscussionDialog from "@/components/NewDiscussionDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, TrendingUp, CheckCircle2, AlertCircle, Search, Plus } from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "How to handle authentication in a React + Node.js app?",
    author: "Alex Thompson",
    category: "Question",
    tags: ["React", "Node.js", "Authentication"],
    replies: 23,
    views: 456,
    solved: true,
    lastActivity: "2 hours ago",
    excerpt: "I'm building a fullstack application and need advice on implementing JWT authentication..."
  },
  {
    id: 2,
    title: "Best practices for MongoDB schema design?",
    author: "Maria Garcia",
    category: "Discussion",
    tags: ["MongoDB", "Database", "Best Practices"],
    replies: 15,
    views: 342,
    solved: false,
    lastActivity: "5 hours ago",
    excerpt: "Looking for input on whether to embed or reference related documents in MongoDB..."
  },
  {
    id: 3,
    title: "Need help debugging React useEffect infinite loop",
    author: "Chris Lee",
    category: "Help",
    tags: ["React", "Debugging", "Hooks"],
    replies: 8,
    views: 189,
    solved: true,
    lastActivity: "1 day ago",
    excerpt: "My useEffect hook is causing an infinite loop and I can't figure out why..."
  },
  {
    id: 4,
    title: "Project Idea: Open Source AI Resume Builder",
    author: "Priya Patel",
    category: "Project",
    tags: ["AI", "Project Idea", "Open Source"],
    replies: 34,
    views: 678,
    solved: false,
    lastActivity: "3 hours ago",
    excerpt: "Looking for collaborators to build an AI-powered resume builder. Here's the tech stack I'm thinking..."
  },
  {
    id: 5,
    title: "TypeScript vs JavaScript for large projects?",
    author: "James Wilson",
    category: "Discussion",
    tags: ["TypeScript", "JavaScript", "Architecture"],
    replies: 56,
    views: 892,
    solved: false,
    lastActivity: "4 hours ago",
    excerpt: "What are your experiences with TypeScript in production applications?"
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Community Discussions</h1>
          <p className="text-lg text-muted-foreground">
            Ask questions, share ideas, and collaborate with fellow developers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Actions */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search discussions..." 
                  className="pl-10 h-12"
                />
              </div>
              <NewDiscussionDialog />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-border pb-4">
              <Button variant="ghost" size="sm">All</Button>
              <Button variant="ghost" size="sm">Questions</Button>
              <Button variant="ghost" size="sm">Discussions</Button>
              <Button variant="ghost" size="sm">Projects</Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Solved
              </Button>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Link key={discussion.id} href={`/discussion/${discussion.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={
                            discussion.category === "Question" ? "destructive" :
                            discussion.category === "Project" ? "default" :
                            "secondary"
                          }>
                            {discussion.category}
                          </Badge>
                          {discussion.solved && (
                            <Badge variant="outline" className="gap-1 border-green-600 text-green-600">
                              <CheckCircle2 className="h-3 w-3" />
                              Solved
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          {discussion.title}
                        </CardTitle>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {discussion.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2 min-w-[80px]">
                        <div className="flex items-center gap-1 text-sm">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{discussion.replies}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">replies</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-secondary text-xs">
                            {discussion.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{discussion.views} views</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Discussions</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions Solved</span>
                  <span className="font-bold">856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-bold">5,678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-bold">142 new</span>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Be respectful and professional</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Provide context and details</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Search before posting</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mark solutions when resolved</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB", "Docker", "Next.js"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
