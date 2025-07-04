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
  subtitle = "Junior Web Developer",
  description = "I create beautiful, responsive web applications with modern technologies. Passionate about clean code, user experience, and bringing ideas to life through technology.",
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
          <div className="relative">
            <div className="relative aspect-square  overflow-hidden rounded-2xl bg-muted lg:h-[80vh] lg:w-full">
              <Slideshow />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/20 blur-xl" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary/20 to-secondary/20 opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
