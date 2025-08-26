import MediaCard from "./MediaCard";
import type { MediaItem } from "@/entities/mediaTypes";

interface Props {
  media: MediaItem[];
}

const MediaGrid = ({ media }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
    {media.map((item, index) => (
      <MediaCard
        key={index}
        item={item}
        className="hover:scale-[1.02] transition-transform duration-200"
      />
    ))}
  </div>
);

export default MediaGrid;
