import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  const apiUrl = `https://graph.instagram.com/v23.0/me?fields=id,username,profile_picture_url,media{caption,media_type,media_url,permalink,timestamp}&access_token=${accessToken}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return NextResponse.json(data);
}
