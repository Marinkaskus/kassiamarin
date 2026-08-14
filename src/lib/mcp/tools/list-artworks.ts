import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_artworks",
  title: "List artworks",
  description: "List artworks in the gallery, optionally filtered by category or availability.",
  inputSchema: {
    category: z.string().trim().optional().describe("Filter by category, e.g. 'painting'."),
    available: z.boolean().optional().describe("Only artworks available for sale."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum number of artworks."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, available, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase.from("artworks").select("*").order("id", { ascending: true }).limit(limit ?? 25);
    if (category) query = query.eq("category", category);
    if (typeof available === "boolean") query = query.eq("available", available);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { artworks: data ?? [] },
    };
  },
});
