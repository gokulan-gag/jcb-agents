"use client";

import { Layout } from "@/layout";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
