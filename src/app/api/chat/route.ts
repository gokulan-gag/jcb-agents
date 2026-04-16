import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { RULES } from "@/utils/consts/queryRules";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface QuestionFile {
  content: string;
  routing_status?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    const query = content.toLowerCase();

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
    const parsed: QuestionFile = JSON.parse(fileContent);

    // Only delay upfront if there's no routing_status to show immediately
    if (!parsed.routing_status || parsed.routing_status.length === 0) {
      await delay(5000);
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send each routing_status agent one by one with 2s between each
        if (parsed.routing_status && parsed.routing_status.length > 0) {
          for (const agent of parsed.routing_status) {
            const event =
              JSON.stringify({ type: "routing_status", agent }) + "\n";
            controller.enqueue(encoder.encode(event));
            await delay(2000);
          }
        }

        // Stream content in chunks
        const chunkSize = 100;
        for (let i = 0; i < parsed.content.length; i += chunkSize) {
          const chunk = parsed.content.slice(i, i + chunkSize);
          const data = JSON.stringify({ type: "item", content: chunk }) + "\n";
          controller.enqueue(encoder.encode(data));
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
