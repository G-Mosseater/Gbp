"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Hero from "@/components/ui/Hero";
import MediaGrid from "@/components/MediaGrid";
import { useInstagramMedia } from "@/services/useInstagramMedia";

const UserProfile = () => {
 
  const { media, paging, loading, initialLoading, loadMedia } =
    useInstagramMedia();

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
    <div className="flex flex-col ">
      <Hero
        title="Gabriel's Instagram Photos"
        description="Here you’ll find some of my latest Instagram photos — they’re pulled in automatically using Instagram’s API, so this gallery always stays fresh with my newest photos without me having to update it manually!"
        ctaText="See My Projects"
        showImage={false}
        noPadding={true}
        showBadges={false}
      />

      <div className="min-h-screen max-w-7xl mx-auto mt-16">
        <MediaGrid media={media} />

        {paging?.next && (
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                loadMedia(paging.next);
              }}
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
  );
};

export default UserProfile;
