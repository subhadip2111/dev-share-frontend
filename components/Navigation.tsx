// import { Link, useNavigate } from "react-router-dom";

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Search, PenSquare, Home, Users, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";
import { useState, useEffect } from "react";

const Navigation = () => {
  const router = useRouter();
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleWriteClick = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
    router.push("/auth");
    } else {
      router.push("/create");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <span className="text-lg font-bold">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">DevShare</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover-scale">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/explore" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover-scale">
                <Compass className="h-4 w-4" />
                Explore
              </Link>
              <Link href="/community" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover-scale">
                <Users className="h-4 w-4" />
                Community
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
              <Input 
                type="search" 
                placeholder="Search posts..." 
                className="pl-10 h-10 transition-all focus:w-72"
              />
            </div>
            
            {user && <NotificationBell />}
            
          

            {accessToken && user ? (
              <UserMenu user={user} />
            ) : (
              <Button variant="outline" onClick={() => router.push("/auth")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
