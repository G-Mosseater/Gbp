import { useState, useEffect } from "react";
import type { MediaItem } from "@/entities/mediaTypes";
import fetchInstagramData from "@/services/fetchInstagramData";

export const useInstagramMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [paging, setPaging] = useState<{ next?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMedia = async (nextUrl?: string) => {
    setLoading(true);
    if (!nextUrl) setInitialLoading(true);
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

  return { media, paging, loading, initialLoading, loadMedia };
};
