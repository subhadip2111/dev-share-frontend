"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

const DiscussionDetail = () => {
  const { id } = useParams();
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([
    {
      id: "1",
      author: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      content: "Great question! I faced something similar. The key is to understand closures deeply...",
      timestamp: "2 hours ago",
      likes: 5,
    },
  ]);

  // Mock discussion data
  const discussion = {
    id,
    title: "What are the most common JavaScript interview questions?",
    type: "Question",
    category: "Frontend",
    author: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    timestamp: "5 hours ago",
    content: `I have an interview coming up and I want to prepare for JavaScript questions. 
    
What are the most commonly asked questions about:
- Closures
- Promises and async/await
- Event loop
- Prototypal inheritance

Any tips or resources would be greatly appreciated!`,
    tags: ["javascript", "interview", "frontend"],
    replies: 12,
    views: 234,
    likes: 18,
  };

  const handleSubmitReply = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!user.email) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply",
        variant: "destructive",
      });
      return;
    }

    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Reply cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newReply = {
      id: Date.now().toString(),
      author: user.name,
      avatar: user.avatar,
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
    };

    setReplies([...replies, newReply]);
    setReplyContent("");
    toast({
      title: "Success",
      description: "Your reply has been posted",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <Link href="/community" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Discussion Header */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={discussion.avatar} alt={discussion.author} />
                <AvatarFallback>{discussion.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{discussion.title}</h1>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.timestamp}</span>
                  <span>•</span>
                  <Badge variant="outline">{discussion.type}</Badge>
                  <Badge>{discussion.category}</Badge>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none mb-4 whitespace-pre-line">
              {discussion.content}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent transition-colors">
                <ThumbsUp className="h-4 w-4" />
                {discussion.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent transition-colors">
                <MessageSquare className="h-4 w-4" />
                {discussion.replies}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Replies Section */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {replies.length} Replies
            </h2>
            
            <div className="space-y-6">
              {replies.map((reply, index) => (
                <div key={reply.id} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={reply.avatar} alt={reply.author} />
                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{reply.author}</span>
                      <span className="text-sm text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <p className="text-sm mb-2 text-foreground">{reply.content}</p>
                    <Button variant="ghost" size="sm" className="gap-2 h-8 hover:bg-accent transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                      {reply.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Your Reply</h3>
            <RichTextEditor
              value={replyContent}
              onChange={setReplyContent}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setReplyContent("")}>Cancel</Button>
              <Button onClick={handleSubmitReply} className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Post Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
