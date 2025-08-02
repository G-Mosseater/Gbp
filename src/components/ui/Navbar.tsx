"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../ModeToggle";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Photos", href: "/photos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="
    sticky top-0 z-50 w-full
   glass
  "
    >
      <div className=" flex h-16 items-center w-full justify-between p-2 md:p-8 ">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Logo.jpg" //
              alt="Logo"
              width={42}
              height={52}
              className="rounded-sm "
            />
            <span className="font-bold text-lg">Gabriel</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}{" "}
          <ModeToggle />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />

              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full glass">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/Logo.jpg" //
                    alt="Logo"
                    width={42}
                    height={42}
                    className="rounded-sm "
                  />{" "}
                  <span className="font-bold">Gabriel</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-12 ">
              <nav className="flex flex-col space-y-8 items-center">
                {navigationItems.map((item) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    key={item.name}
                    href={item.href}
                    className={`text-3xl font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <ModeToggle />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
