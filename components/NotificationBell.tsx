"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const NotificationBell = () => {
  const [notifications] = useState([
    {
      id: "1",
      type: "reply",
      user: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      message: "replied to your discussion",
      title: "JavaScript Interview Questions",
      time: "5 min ago",
      read: false,
    },
    {
      id: "2",
      type: "like",
      user: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      message: "liked your post",
      title: "React Best Practices",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "mention",
      user: "Sarah Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      message: "mentioned you in a comment",
      title: "TypeScript Tips",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-scale-in"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-card shadow-lg border border-border">
        <div className="px-4 py-3 border-b border-border bg-accent/5">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  !notification.read ? "bg-accent/50 hover:bg-accent/70" : "hover:bg-accent/30"
                }`}
              >
                <div className="flex gap-3 w-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.avatar} alt={notification.user} />
                    <AvatarFallback>{notification.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{notification.user}</span>{" "}
                      {notification.message}
                    </p>
                    <p className="text-xs text-primary font-medium truncate">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
