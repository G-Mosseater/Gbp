"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Photos", href: "/photos" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <header
      className="
    sticky top-0 z-50 w-full
    border-b border-white/20
    bg-white/30 dark:bg-gray-900/30
    backdrop-blur-md supports-[backdrop-filter]:bg-white/30 supports-[backdrop-filter]:dark:bg-gray-900/30
    shadow-md
  "
    >
      <div className=" flex h-16 items-center w-full justify-between p-2 md:p-8 ">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-sm bg-primary" />
            <span className="font-bold text-lg">Gabriel</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                activeTab === item.name
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}{" "}
          <ModeToggle />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-sm bg-primary" />
                  <span className="font-bold">My Portfolio</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <nav className="flex flex-col space-y-4 items-center">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      activeTab === item.name
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
