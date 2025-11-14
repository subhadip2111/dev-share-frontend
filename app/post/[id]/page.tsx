// import { useParams, Link } from "react-router-dom";
"use client";

import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPostDetailsById } from "@/utils/post";
import { toast } from "sonner";

const PostDetail = () => {
  const { id } = useParams();
const [post, setPost] = useState(null);
  const getdeatilsById = async (id:any) => {
   try {
    const token = localStorage.getItem("accessToken");
    const data = await getPostDetailsById(token,id);
    console.log("post details by id",data)
    setPost(data);
   } catch (error) {
    toast.error("something went wrong" );
   }
  }
useEffect(() => {
    if (id) {
      getdeatilsById(id);
    }
  }, [id]);


const relatedPosts = [
    { id: 2, title: "Advanced React Patterns You Should Know", category: "Frontend" },
    { id: 3, title: "JavaScript Interview Questions - Complete Guide", category: "Frontend" },
    { id: 4, title: "My Google Interview Experience - Full Journey", category: "Interview" }
  ];
  const formatReadTime = (time:any) => `${Math.ceil(Number(time)/60)||0} min read`;


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/explore">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <article>
              {/* Header */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{post?.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
{formatReadTime(post?.readTime)}

                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
{new Date(post?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {post?.title}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post?.author?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post?.author?.name}</p>
                      <p className="text-sm text-muted-foreground">{post?.author.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post?.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Content */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {post?.content}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Engagement */}
              <div className="flex items-center gap-6">
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  {post?.likes} Likes
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  {post?.comments} Comments
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h3 className="text-2xl font-bold">Comments ({post?.comments})</h3>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Share your thoughts..." 
                    className="min-h-[100px]"
                  />
                  <Button>Post Comment</Button>
                </div>

                <Separator />

                {/* Sample Comments */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">John Doe</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="mt-1 text-sm">
                          Great article! The custom hook example was particularly helpful. 
                          I've been struggling with this pattern.
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button className="text-xs text-muted-foreground hover:text-foreground">
                            Reply
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-foreground">
                            ❤️ 12
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Posts */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">Related Posts</h3>
                <div className="space-y-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/post/${relatedPost.id}`}>
                      <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <Badge variant="outline" className="mb-2">
                          {relatedPost.category}
                        </Badge>
                        <p className="text-sm font-medium leading-tight">
                          {relatedPost.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "JavaScript", "TypeScript", "Node.js", "Python", "Interview"].map((tag) => (
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

export default PostDetail;
