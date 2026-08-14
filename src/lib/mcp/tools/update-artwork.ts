import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_artwork",
  title: "Update artwork",
  description: "Update fields of an existing artwork. Requires admin privileges on the signed-in account.",
  inputSchema: {
    id: z.number().int().describe("Artwork id."),
    title: z.string().trim().min(1).optional(),
    year: z.string().trim().optional(),
    medium: z.string().trim().optional(),
    size: z.string().trim().optional(),
    category: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z.string().trim().optional(),
    available: z.boolean().optional(),
    image_src: z.string().trim().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ id, ...patch }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (Object.keys(patch).length === 0) {
      return { content: [{ type: "text", text: "No fields to update" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("artworks").update(patch).eq("id", id).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { artwork: data },
    };
  },
});
