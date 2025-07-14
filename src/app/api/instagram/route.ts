import { MediaItem } from "@/entities/mediaTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

  // const apiUrl = `https://graph.instagram.com/v23.0/me?fields=id,username,profile_picture_url,media{caption,media_type,media_url,permalink,timestamp}&access_token=${accessToken}`;

  const { searchParams } = new URL(request.url);
  const nextUrl = searchParams.get("next");
  const baseUrl = "https://graph.instagram.com";
  let mediaUrl = nextUrl
    ? decodeURIComponent(nextUrl)
    : `${baseUrl}/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,children{media_url,media_type}&access_token=${accessToken}&limit=25`;

  try {
    const mediaRes = await fetch(mediaUrl);

    const mediaData: { data: MediaItem[]; paging: any } = await mediaRes.json();
    const children = mediaData.data.map(
      (item: MediaItem) => item.children?.data || []
    );
    const userRes = await fetch(
      `${baseUrl}/me?fields=id,username,profile_picture_url&access_token=${accessToken}`
    );

    const user = await userRes.json();

    return NextResponse.json({
      user,
      media: mediaData.data as MediaItem[],
      paging: mediaData.paging,
      children,
    });
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
