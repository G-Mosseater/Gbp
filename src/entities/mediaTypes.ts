export type MediaItem = {
  id: string;
  media_url: string;
  caption?: string;
  timestamp: string;
  media_type: string;
  permalink: string;
  thumbnail_url?: string;
  username: string;
  children?: {
    data: {
      id: string;
      media_type: string;
      media_url: string;
    }[];
  };
};
export type User = {
  id: string;
  username: string;
  media_count: number;
  media: {
    data: MediaItem[];
  };
};
