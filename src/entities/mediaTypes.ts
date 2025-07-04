export  type MediaItem = {
  id: string;
  media_url: string;
  caption?: string;
  timestamp: string;
  media_type: string;
  permalink: string;
  thumbnail_url?: string;
  username: string;
};

export type User = {
  id: string;
  username: string;
  media_count: number;
  media: {
    data: MediaItem[];
  };
};
