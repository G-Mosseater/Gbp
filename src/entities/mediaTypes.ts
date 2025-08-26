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


export type GitHubRepos = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}