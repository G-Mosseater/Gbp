const fetchInstagramData = async (next?: string) => {
  const url = next
    ? `/api/instagram?next=${encodeURIComponent(next)}`
    : "/api/instagram";

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch Instagram Data");
  }

  const data = await response.json();

  return {
    media: data.media || [],
    paging: data.paging || null,
  };
};

export default fetchInstagramData;
