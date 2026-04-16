import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { RULES } from "@/utils/consts/queryRules";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface QuestionFile {
  content: string;
  routing_status?: string[];
}

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
    const parsed: QuestionFile = JSON.parse(fileContent);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Emit routing_status first if present
        if (parsed.routing_status && parsed.routing_status.length > 0) {
          const routingEvent =
            JSON.stringify({
              type: "routing_status",
              agents: parsed.routing_status,
            }) + "\n";
          controller.enqueue(encoder.encode(routingEvent));
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
