export interface Message {
  role: "user" | "assistant";
  content: string;
  htmlBlocks?: { id: string; content: string; isTrailing?: boolean; isHtmlOnly?: boolean }[];
}
