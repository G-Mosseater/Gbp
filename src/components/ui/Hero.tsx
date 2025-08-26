import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Slideshow from "../Slideshow";


interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badges?: string[];
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showImage?: boolean;
  noPadding?: boolean;
  showBadges?: boolean;
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
  showImage = true,
  noPadding = false,
  showBadges = true,
}: HeroProps) {

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 sm:px-0">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">
            {subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>

          {showBadges && (
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          </div>
        </div>

        {showImage && (
          <div className="relative flex-shrink-0 w-full md:w-[40%] max-w-[500px] h-auto rounded-sm mt-6 md:mt-0">
            <Slideshow />
          </div>
        )}
      </div>
    </section>
  );
}
