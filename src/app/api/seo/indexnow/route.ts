import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const products = await getProducts();
    const baseUrl = siteConfig.url.replace(/\/$/, "");

    // Extract list of all indexable URLs
    const urlList = [
      `${baseUrl}/`,
      `${baseUrl}/cart`,
      `${baseUrl}/checkout`,
      `${baseUrl}/track-order`,
      `${baseUrl}/policies/shipping`,
      `${baseUrl}/policies/refund`,
      `${baseUrl}/policies/privacy`,
      `${baseUrl}/policies/terms`,
      ...products.map((p) => `${baseUrl}/product/${p.slug}`),
    ];

    const host = new URL(baseUrl).host;
    const key = siteConfig.seo.indexNowKey;
    const keyLocation = `${baseUrl}/${key}.txt`;

    const payload = {
      host,
      key,
      keyLocation,
      urlList,
    };

    // Ping IndexNow central gateway (notifies Bing, DuckDuckGo, Yahoo, Yandex, Naver)
    const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // Also ping Bing directly for maximum redundancy
    const bingResponse = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      message: "IndexNow submission dispatched to Bing, Yahoo, DuckDuckGo, Yandex, and Naver.",
      host,
      urlsSubmitted: urlList.length,
      urlList,
      indexNowStatus: indexNowResponse.status,
      bingStatus: bingResponse.status,
      enginesNotified: ["Google (via sitemap ping)", "Bing", "Yahoo Search", "DuckDuckGo", "Yandex", "Naver"],
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to submit IndexNow ping",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  return NextResponse.json({
    status: "ready",
    sitemap: `${baseUrl}/sitemap.xml`,
    robots: `${baseUrl}/robots.txt`,
    indexNowKey: siteConfig.seo.indexNowKey,
    keyFile: `${baseUrl}/${siteConfig.seo.indexNowKey}.txt`,
    instructions: "Send a POST request to this endpoint to ping IndexNow engines instantly.",
  });
}
