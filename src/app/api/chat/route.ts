import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { RULES } from "@/utils/consts/queryRules";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    const query = content.toLowerCase();

    await delay(5000);

    const q = query?.toLowerCase() ?? "";

    const fileName = RULES.find((rule) =>
      rule.keywords.some((k) => q.includes(k.toLowerCase())),
    )?.file;

    if (!fileName) {
      return NextResponse.json(
        { error: "No matching intent found" },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), "src/app/markdown", fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Create a readable stream to simulate a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // We split by lines or chunks to simulate streaming
        // For simplicity and matching the expected client format:
        // The client expects lines of JSON: {"type": "item", "content": "..."}

        // Split content into small chunks to simulate real streaming
        const chunkSize = 100;
        for (let i = 0; i < fileContent.length; i += chunkSize) {
          const chunk = fileContent.slice(i, i + chunkSize);
          const data = JSON.stringify({ type: "item", content: chunk }) + "\n";
          controller.enqueue(encoder.encode(data));
          // Small delay to make it look "live"
          //   await new Promise((resolve) => setTimeout(resolve, 5));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
