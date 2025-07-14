"use client";

import { MediaItem } from "@/entities/mediaTypes";
import fetchInstagramData from "@/services/fetchInstagramData";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
const UserProfile = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [paging, setPaging] = useState<{ next?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const loadMedia = async (nextUrl?: string) => {
    setLoading(true);
    try {
      const res = await fetchInstagramData(nextUrl);
      setMedia((prev) => [...prev, ...res.media]);
      setPaging(res.paging || null);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ul>
        {media.map((item) => {
          const hasChildren =
            item.media_type === "CAROUSEL_ALBUM" &&
            item.children &&
            item.children?.data.length > 0;

          return (
            <li key={item.id} className="relative w-[400px] h-64 mb-12">
              {hasChildren ? (
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {item.children?.data.map((childItem) => (
                      <CarouselItem key={childItem.id}>
                        <div className="relative w-full h-64">
                          {childItem.media_type === "VIDEO" ? (
                            <video
                              src={childItem.media_url}
                              muted
                              loop
                              controls
                              className="object-cover rounded-lg w-full h-full"
                            />
                          ) : (
                            <Image
                              src={childItem.media_url}
                              alt={item.caption || "Instagram carousel image"}
                              fill
                              className="object-cover rounded-lg"
                              priority={false}
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : item.media_type === "VIDEO" ? (
                <video
                  src={item.media_url}
                  autoPlay
                  muted
                  loop
                  controls
                  className="object-cover rounded-lg w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={item.media_url}
                    alt={item.caption || "Instagram media"}
                    fill
                    className="object-cover rounded-lg"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
              )}

              <p className="mt-2">{item.caption}</p>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
            </li>
          );
        })}
      </ul>
      {paging?.next && (
        <Button
          onClick={() => loadMedia(paging.next)}
          disabled={loading}
          className="px-4 py-2  text-white rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
