import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const path = formData.get("path") as string;
    const tag = formData.get("tag") as string;

    if (!path && !tag) {
      return NextResponse.json(
        { error: "Missing path or tag parameter" },
        { status: 400 }
      );
    }

    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Redirect back to the page that was revalidated
    if (path) {
      return NextResponse.redirect(new URL(path, request.url));
    }

    return NextResponse.json({
      revalidated: true,
      path,
      tag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        error: "Error revalidating",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");
  const secret = searchParams.get("secret");

  // Optional: Add secret token validation for security
  if (
    process.env.REVALIDATION_SECRET &&
    secret !== process.env.REVALIDATION_SECRET
  ) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path && !tag) {
    return NextResponse.json(
      { error: "Missing path or tag query parameter" },
      { status: 400 }
    );
  }

  try {
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path via GET: ${path}`);
    }

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag via GET: ${tag}`);
    }

    return NextResponse.json({
      revalidated: true,
      path,
      tag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        error: "Error revalidating",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
