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
    <div className="min-h-screen p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {media.map((item) => {
          const hasChildren =
            item.media_type === "CAROUSEL_ALBUM" &&
            item.children &&
            item.children?.data.length > 0;

          return (
            <li key={item.id} className="flex flex-col w-full h-full">
              {hasChildren ? (
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {item.children?.data.map((childItem) => (
                      <CarouselItem key={childItem.id}>
                        <div className="relative  h-[500px] w-full overflow-hidden ">
                          {childItem.media_type === "VIDEO" ? (
                            <video
                              src={childItem.media_url}
                              muted
                              loop
                              controls
                              className="object-contain  mx-auto h-full w-auto"
                            />
                          ) : (
                            <Image
                              src={childItem.media_url}
                              alt={item.caption || "Instagram carousel image"}
                              fill
                              className="h-full w-auto object-contain mx-auto  "
                              loading="lazy"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10" />
                </Carousel>
              ) : item.media_type === "VIDEO" ? (
                <div className="relative w-full h-[500px]">
                  <video
                    src={item.media_url}
                    autoPlay
                    muted
                    loop
                    controls
                    className="object-contain w-full h-full  "
                  />
                </div>
              ) : (
                <div className="relative w-full h-[500px]">
                  <Image
                    src={item.media_url}
                    alt={item.caption || "Instagram media"}
                    fill
                    className="h-full w-auto object-contain mx-auto "
                    loading="lazy"
                  />
                  
                </div>
              )}

              <p >{item.caption}</p>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
            </li>
          );
        })}
      </ul>
      {paging?.next && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => loadMedia(paging.next)}
            disabled={loading}
            className="px-4 py-2 text-white rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
