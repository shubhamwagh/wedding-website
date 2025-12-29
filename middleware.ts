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
      return NextResponse.redirect(uploadUrl, 307);
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
      return NextResponse.redirect(galleryUrl, 307);
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
