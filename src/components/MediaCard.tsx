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
import { Calendar, Loader2 } from "lucide-react";
import { useState } from "react";

interface MediaCardProps {
  item: MediaItem;
  className?: string;
}

export default function MediaCard({ item }: MediaCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const hasChildren = item.media_type === "CAROUSEL_ALBUM" && item.children;

  //Convert instagram timestamp into a readable date
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
    // If instagram array is a carousel:
    if (hasChildren) {
      return (
        <div className="relative w-full h-[350px] overflow-hidden rounded-t-lg ">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {item.children?.data.map((childItem) => (
                <CarouselItem key={childItem.id}>
                  <div className="relative w-full h-[350px] flex items-center justify-center ">
                    {/* If item is a video: */}
                    {childItem.media_type === "VIDEO" ? (
                      <div className="relative w-full h-full group">
                        {!videoLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 backdrop-blur-sm">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        <video
                          src={childItem.media_url}
                          muted
                          loop
                          controls
                          className="object-cover w-full h-full"
                          onLoadedData={() => setVideoLoaded(true)}
                        />
                      </div>
                    ) : (
                      // If it is image
                      <div className="relative w-full h-[350px]">
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 backdrop-blur-sm">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        <Image
                          src={childItem.media_url}
                          alt="Instagram photo"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={`object-cover transition-opacity duration-500 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          loading="lazy"
                          onLoad={() => setImageLoaded(true)}
                        />
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block md:absolute md:top-1/2 md:left-4 md:-translate-y-1/2 md:z-10" />
            <CarouselNext className="hidden md:absolute md:block md:top-1/2 md:right-4 md:-translate-y-1/2 md:z-10" />
          </Carousel>
          {/* Carousel bullets */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {item.children?.data.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/60 backdrop-blur-sm"
              />
            ))}
          </div>
        </div>
      );
    }
    // If it is a video"
    if (item.media_type === "VIDEO") {
      return (
        <div className="relative w-full h-[350px] overflow-hidden rounded-t-lg group">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 backdrop-blur-sm">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
          )}
          <video
            src={item.media_url}
            autoPlay
            muted
            loop
            controls
            className="object-cover w-full h-full"
            onLoadedData={() => setVideoLoaded(true)}
            poster={item.thumbnail_url}
          />
        </div>
      );
    }
    // If it's a image:
    return (
      <div className="relative w-full h-[350px] overflow-hidden rounded-t-lg ">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 backdrop-blur-sm">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}
        <Image
          src={item.media_url}
          alt="Instagram photo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    );
  };

  return (
    <Card className=" w-[300px] overflow-hidden  hover:scale-[1.02] transition-transform duration-300 ease-in-out hover:shadow-lg border-0">
      {/* Render whatever is inside renderMedia */}
      <CardContent className="p-0">{renderMedia()}</CardContent>
      {/* If the media item has a caption or timestamp then: */}
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
