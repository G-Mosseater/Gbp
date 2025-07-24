import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Slideshow from "../Slideshow";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  badges?: string[];
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function Hero({
  title = "Gabriel",
  subtitle = "Junior Web Developer / Senior Bug Summoner 🐜",
  description = "This page is my personal space to practice coding and share future projects. I'm trying out glasmorphism because it looks cool and futuristic.",
  badges = ["React", "Next.js", "TypeScript", "Figma", "SQL", "TailwindCSS"],
  ctaText = "View my projects",
  ctaHref = "/projects",
  secondaryCtaText = "Contact Me",
  secondaryCtaHref = "/",
}: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 sm:py-22 lg:py-8 sm:px-4">
      <div className="flex px-4 sm:px-0 md:justify-center">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl">
                {subtitle}
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex items-center justify-center overflow-hidden h-[40vh] md:h-[60vh] rounded-sm lg:h-[80vh] w-full">
            <Slideshow />
          </div>
        </div>
      </div>
    </section>
  );
}
