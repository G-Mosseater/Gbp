const fetchInstagramData = async (next?: string) => {
  const url = next
    ? `/api/instagram?next=${encodeURIComponent(next)}`
    : "/api/instagram";

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Instagram Data");
  }
  return await response.json();
};

export default fetchInstagramData;
