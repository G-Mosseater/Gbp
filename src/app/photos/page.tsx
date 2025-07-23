"use client"

import type { MediaItem } from "@/entities/mediaTypes"
import fetchInstagramData from "@/services/fetchInstagramData"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import MediaCard from "@/components/MediaCard"
import { Loader2 } from "lucide-react"

const UserProfile = () => {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [paging, setPaging] = useState<{ next?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const loadMedia = async (nextUrl?: string) => {
    setLoading(true)
    try {
      const res = await fetchInstagramData(nextUrl)
      setMedia((prev) => [...prev, ...res.media])
      setPaging(res.paging || null)
    } catch (error) {
      console.error("Failed to load photos:", error)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading my instagram photos...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Media Gallery</h1>
  
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {media.map((item) => (
          <MediaCard key={item.id} item={item} className="hover:scale-[1.02] transition-transform duration-200" />
        ))}
      </div>

      {paging?.next && (
        <div className="flex justify-center mt-12">
          <Button onClick={() => loadMedia(paging.next)} disabled={loading} size="lg" className="px-8 py-3">
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
  )
}

export default UserProfile
