"use client";

import type { MediaItem } from "@/entities/mediaTypes";
import fetchInstagramData from "@/services/fetchInstagramData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MediaCard from "@/components/MediaCard";
import { Loader2 } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
}

const UserProfile = ({
  title = "Gabriel",
  subtitle = "Junior Web Developer / Senior Bug Summoner 🐜",
}: Props) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [paging, setPaging] = useState<{ next?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMedia = async (nextUrl?: string) => {
    setLoading(true);
    setInitialLoading(true);
    try {
      const res = await fetchInstagramData(nextUrl);
      setMedia((prev) => [...prev, ...res.media]);
      setPaging(res.paging || null);
    } catch (error) {
      console.error("Failed to load photos:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading my instagram photos...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col pt-20 p-4 ">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg break-words mb-4">
            {subtitle}
          </p>
        </div>
        <div className="min-h-screen max-w-7xl mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10">
            {media.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                className="hover:scale-[1.02] transition-transform duration-200"
              />
            ))}
          </div>

          {paging?.next && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => loadMedia(paging.next)}
                disabled={loading}
                size="lg"
                className="px-8 py-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
