import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background border-t border-border">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Gabriel
          </h3>

          <div className="flex gap-4">
            <Link
              href="https://www.linkedin.com/in/gabriel-burlacu-30bb60277"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/gabonization/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/G-Mosseater"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-border pt-6 mt-6">
          <p className="text-sm text-muted-foreground">
            All rights reserved {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
