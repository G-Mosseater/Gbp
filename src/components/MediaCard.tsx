"use client";

import type { MediaItem } from "@/entities/mediaTypes";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface MediaCardProps {
  item: MediaItem;
  className?: string;
}

export default function MediaCard({ item, className = "" }: MediaCardProps) {
  const hasChildren = item.media_type === "CAROUSEL_ALBUM" && item.children;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMedia = () => {
    if (hasChildren) {
      return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-t-lg bg-red">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {item.children?.data.map((childItem) => (
                <CarouselItem key={childItem.id}>
                  <div className="relative w-full h-[400px] flex items-center justify-center ">
                    {childItem.media_type === "VIDEO" ? (
                      <div className="relative w-full h-full group">
                        <video
                          src={childItem.media_url}
                          muted
                          loop
                          controls
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <Image
                        src={childItem.media_url}
                        alt="Instagram photo"
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10" />
          </Carousel>
          {/* Carousel indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {item.children?.data.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full 
             border border-white/20 
             bg-white/30 dark:bg-gray-900/30 
             backdrop-blur-md 
             supports-[backdrop-filter]:bg-white/30 
             supports-[backdrop-filter]:dark:bg-gray-900/30 
             shadow-md"
              />
            ))}
          </div>
        </div>
      );
    }

    if (item.media_type === "VIDEO") {
      return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-t-lg group">
          <video
            src={item.media_url}
            autoPlay
            muted
            loop
            controls
            className="object-cover w-full h-full"
            poster={item.thumbnail_url}
          />
        </div>
      );
    }

    return (
      <div className="relative w-full h-[500px] overflow-hidden rounded-t-lg ">
        <Image
          src={item.media_url}
          alt="Instagram photo"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <Card
      className={`w-full overflow-hidden 
  border border-white/20 
  bg-white/30 dark:bg-gray-900/30 
  backdrop-blur-md 
  supports-[backdrop-filter]:bg-white/30 
  supports-[backdrop-filter]:dark:bg-gray-900/30 
  shadow-md hover:shadow-lg transition-shadow 
  ${className}`}
    >
      <CardContent className="p-0">{renderMedia()}</CardContent>

      {(item.caption || item.timestamp) && (
        <CardFooter className="flex flex-col gap-2">
          {item.caption && (
            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
              {item.caption}
            </p>
          )}

          {item.timestamp && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <time dateTime={item.timestamp}>
                {formatDate(item.timestamp)}
              </time>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
