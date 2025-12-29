import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Handle uploads subdomain
  if (host.startsWith(`${process.env.UPLOADS_SUBDOMAIN}.`)) {
    const uploadUrl = process.env.UPLOAD_URL;
    const uploadsEnabled = process.env.UPLOADS_ENABLED !== "false"; 

    if (!uploadsEnabled) {
      return new NextResponse("Uploads are temporarily disabled.", { status: 403 });
    }

    if (uploadUrl) {
      const html = `<html><head>
          <meta property="og:title" content="Shilpa & Shubham Wedding - Share Your Photos" />
          <meta property="og:description" content="Share your photos from Shilpa & Shubham Wedding on January 03, 2026. Be the first to add photos!" />
          <meta property="og:image" content="https://shilpashubham.com/uploads.webp" />
          <meta name="robots" content="noindex, nofollow">
          <meta http-equiv="refresh" content="0;url=${uploadUrl}">
          </head><body></body></html>`;
      const res = new NextResponse(html, { status: 200 });
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noimageindex");
      res.headers.set("Content-Type", "text/html");
      return res;
    } else {
      // fallback for local dev
      if (host.includes("localhost")) {
        return NextResponse.next();
      }
      return new NextResponse("Upload URL not configured.", { status: 500 });
    }
  }

  // Handle gallery subdomain
  if (host.startsWith(`${process.env.GALLERY_SUBDOMAIN}.`)) {
    const galleryUrl = process.env.GALLERY_URL;
    const galleryEnabled = process.env.GALLERY_ENABLED !== "false";

    if (!galleryEnabled) {
      return new NextResponse("Gallery is temporarily disabled.", { status: 403 });
    }

    if (galleryUrl) {
      const html = `<html><head>
          <meta property="og:title" content="Shilpa & Shubham Wedding - Live slideshow" />
          <meta property="og:description" content="Watch photos and videos from Shilpa & Shubham Wedding appear in real-time as guests upload them." />
          <meta property="og:image" content="https://shilpashubham.com/gallery.png" />
          <meta name="robots" content="noindex, nofollow">
          <meta http-equiv="refresh" content="0;url=${galleryUrl}">
          </head><body></body></html>`;
      const res = new NextResponse(html, { status: 200 });
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noimageindex");
      res.headers.set("Content-Type", "text/html");
      return res;
    } else {
      // fallback for local dev
      if (host.includes("localhost")) {
        return NextResponse.next(); 
      }
      return new NextResponse("Gallery URL not configured.", { status: 500 });
    }
  }

  // Default: main site
  return NextResponse.next();
}
