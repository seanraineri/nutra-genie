import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Heart,
  MessageSquare,
  Package,
  User,
  Trophy,
} from "lucide-react";

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    {
      icon: BarChart3,
      href: "/dashboard",
      active: isActive("/dashboard"),
    },
    {
      icon: Heart,
      href: "/goals",
      active: isActive("/goals"),
    },
    {
      icon: Package,
      href: "/supplements",
      active: isActive("/supplements"),
    },
    {
      icon: MessageSquare,
      href: "/chat",
      active: isActive("/chat"),
    },
    {
      icon: Trophy,
      href: "/rewards",
      active: isActive("/rewards"),
    },
    {
      icon: User,
      href: "/profile",
      active: isActive("/profile"),
    },
  ];

  return (
    <div className="flex h-full w-[72px] flex-col items-center border-r bg-background py-4">
      <div className="flex flex-1 flex-col gap-4 pt-8">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              to={link.href}
              className={cn(
                "group relative rounded-lg p-3 hover:bg-accent",
                link.active && "bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{link.href.slice(1)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};