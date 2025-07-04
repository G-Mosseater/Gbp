"use client";
import { User, MediaItem } from "@/entities/mediaTypes";
import fetchInstagramData from "@/services/fetchInstagramData";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchInstagramData().then((res) => {
      setData(res);
      setMedia(res.media.data)
      console.log(res);
    });
  }, []);

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul>
        {media.map((item) => (
          <li key={item.id}>
            <img
              src={item.media_url}
              alt={item.caption || "Instagram media"}
              width={555}
            />
            <p>{item.caption}</p>
            <small>{new Date(item.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default UserProfile;
