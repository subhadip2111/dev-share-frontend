
"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, MessageSquare, TrendingUp, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getPostByquery } from "@/utils/post";
import { toast } from "sonner";

const categories = [
    "All", "Frontend", "Backend", "Fullstack", "AI & ML", "DevOps", "Mobile", "Database", "Security"
];

// const allPosts = [
//     {
//         id: 1,
//         title: "React Hooks Interview Questions Asked at Google",
//         excerpt: "A comprehensive list of React Hooks questions from my recent Google interview experience, including useEffect, useState, and custom hooks...",
//         author: "Sarah Chen",
//         category: "Frontend",
//         readTime: "8 min",
//         likes: 234,
//         comments: 45,
//         date: "2 days ago",
//         tags: ["React", "Interview", "Google"]
//     },
//     {
//         id: 2,
//         title: "Building Scalable Microservices with Node.js",
//         excerpt: "Learn how to design and implement microservices architecture that scales to millions of users. Covers Docker, Kubernetes, and message queues...",
//         author: "Mike Johnson",
//         category: "Backend",
//         readTime: "12 min",
//         likes: 456,
//         comments: 89,
//         date: "1 day ago",
//         tags: ["Node.js", "Microservices", "Architecture"]
//     },
//     {
//         id: 3,
//         title: "Complete Machine Learning Interview Prep Guide",
//         excerpt: "From zero to ML engineer: resources, projects, and lessons learned. Includes Python libraries, algorithms, and real interview questions...",
//         author: "Priya Sharma",
//         category: "AI & ML",
//         readTime: "15 min",
//         likes: 789,
//         comments: 123,
//         date: "3 days ago",
//         tags: ["Machine Learning", "Career", "Guide"]
//     },
//     {
//         id: 4,
//         title: "System Design: URL Shortener Like bit.ly",
//         excerpt: "Deep dive into designing a URL shortening service. Covers database schema, API design, caching strategies, and scaling considerations...",
//         author: "Alex Kumar",
//         category: "Fullstack",
//         readTime: "20 min",
//         likes: 567,
//         comments: 78,
//         date: "4 days ago",
//         tags: ["System Design", "Architecture", "Interview"]
//     },
//     {
//         id: 5,
//         title: "TypeScript Best Practices for Large Projects",
//         excerpt: "Essential TypeScript patterns and practices I learned while working on enterprise applications. Improve type safety and developer experience...",
//         author: "Emma Davis",
//         category: "Frontend",
//         readTime: "10 min",
//         likes: 345,
//         comments: 56,
//         date: "5 days ago",
//         tags: ["TypeScript", "Best Practices", "Enterprise"]
//     },
//     {
//         id: 6,
//         title: "AWS Solutions Architect Interview Experience",
//         excerpt: "Detailed breakdown of my AWS certification and interview process at Amazon. Includes resources, tips, and actual questions asked...",
//         author: "David Park",
//         category: "DevOps",
//         readTime: "14 min",
//         likes: 432,
//         comments: 67,
//         date: "1 week ago",
//         tags: ["AWS", "Interview", "Cloud"]
//     }
// ];

const Explore = () => {
    const router = useRouter();
const [allPosts,setAllPosts]=useState();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const token = localStorage.getItem("accessToken");

    const filteredPosts = allPosts?
        .filter(post => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "popular":
                    return b.likes - a.likes;
                case "commented":
                    return b.comments - a.comments;
                case "recent":
                default:
                    return 0;
            }
        });

    const handleAddNewPost = () => {
        router.push("/create");
    };
    const fetchPosts=async()=>{
        try {
            const postData=await getPostByquery(token)
            console.log("postData",postData)
            setAllPosts(postData.data);
        } catch (error) {
           
            toast.error("Failed to fetch posts.");
        }
    }
    console.log("allPosts",allPosts)
useEffect(()=>{
    fetchPosts();
},[])
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold">Explore Posts</h1>
                            <p className="text-lg text-muted-foreground">
                                Discover tutorials, interview experiences, and technical insights from the community
                            </p>
                        </div>
                        <Button onClick={handleAddNewPost} className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                            <Plus className="h-4 w-4" />
                            Add New Post
                        </Button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 space-y-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search posts, tags, or topics..."
                                className="pl-10 h-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[200px] h-12">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Most Recent
                                    </div>
                                </SelectItem>
                                <SelectItem value="popular">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4" />
                                        Most Popular
                                    </div>
                                </SelectItem>
                                <SelectItem value="commented">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Most Commented
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-muted-foreground">
                        {filteredPosts?.length} post{filteredPosts?.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Trending
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Recent
                        </Button>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts?.map((post:any) => (
                        <Link key={post._id} href={`/post/${post._id}`}>
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
                                    <p className="text-muted-foreground line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                #{tag}
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

                {filteredPosts?.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-muted-foreground mb-4">No posts found</p>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;

