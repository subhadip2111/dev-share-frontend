"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2, Check } from "lucide-react";

const DiscussionDetail = () => {
  const [replyContent, setReplyContent] = useState("");
  const [discussionLiked, setDiscussionLiked] = useState(false);
  const [discussionLikes, setDiscussionLikes] = useState(18);
  const [copied, setCopied] = useState(false);
  const [replies, setReplies] = useState([
    {
      id: "1",
      author: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      content: "Great question! I faced something similar. The key is to understand closures deeply...",
      timestamp: "2 hours ago",
      likes: 5,
      liked: false,
    },
  ]);

  // Mock discussion data
  const discussion = {
    id: "1",
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
  };

  const handleDiscussionLike = () => {
    if (discussionLiked) {
      setDiscussionLikes(discussionLikes - 1);
      setDiscussionLiked(false);
    } else {
      setDiscussionLikes(discussionLikes + 1);
      setDiscussionLiked(true);
    }
  };

  const handleReplyLike = (replyId:any) => {
    setReplies(replies.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
          liked: !reply.liked
        };
      }
      return reply;
    }));
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    const newReply = {
      id: Date.now().toString(),
      author: "Current User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      liked: false,
    };

    setReplies([...replies, newReply]);
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </button>

        {/* Discussion Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={discussion.avatar} alt={discussion.author} />
              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{discussion.title}</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{discussion.author}</span>
                <span>•</span>
                <span>{discussion.timestamp}</span>
                <span>•</span>
                <Badge variant="outline">{discussion.type}</Badge>
                <Badge>{discussion.category}</Badge>
              </div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none mb-4 whitespace-pre-line text-gray-700">
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
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-2 transition-colors ${discussionLiked ? 'text-blue-600' : ''}`}
              onClick={handleDiscussionLike}
            >
              <ThumbsUp className={`h-4 w-4 ${discussionLiked ? 'fill-blue-600' : ''}`} />
              {discussionLikes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              {replies.length}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={handleShare}
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Copied!" : "Share"}
            </Button>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <MessageSquare className="h-5 w-5" />
            {replies.length} Replies
          </h2>
          
          <div className="space-y-6">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={reply.avatar} alt={reply.author} />
                  <AvatarFallback>{reply.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{reply.author}</span>
                    <span className="text-sm text-gray-500">{reply.timestamp}</span>
                  </div>
                  <p className="text-sm mb-2 text-gray-700">{reply.content}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-2 h-8 transition-colors ${reply.liked ? 'text-blue-600' : ''}`}
                    onClick={() => handleReplyLike(reply.id)}
                  >
                    <ThumbsUp className={`h-3 w-3 ${reply.liked ? 'fill-blue-600' : ''}`} />
                    {reply.likes}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Reply</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="Write your reply..."
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setReplyContent("")}>Cancel</Button>
            <Button onClick={handleSubmitReply} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="h-4 w-4" />
              Post Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;