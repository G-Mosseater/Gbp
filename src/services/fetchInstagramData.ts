const fetchInstagramData = async () => {
  const response = await fetch("/api/instagram", {
    method: "GET",
  });
     if (!response.ok) {
      throw new Error("Failed to fetch Instagram Data")
   } 
   return await response.json()
};


export default fetchInstagramData