import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_artwork",
  title: "Create artwork",
  description: "Add a new artwork to the gallery. Requires admin privileges on the signed-in account.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Artwork title."),
    year: z.string().trim().optional().describe("Year of creation."),
    medium: z.string().trim().optional().describe("Medium, e.g. 'Oil on canvas'."),
    size: z.string().trim().optional().describe("Dimensions, e.g. '100 x 80 cm'."),
    category: z.string().trim().optional().describe("Category grouping."),
    description: z.string().trim().optional().describe("Description text."),
    price: z.string().trim().optional().describe("Price as displayed."),
    available: z.boolean().optional().describe("Whether the artwork is available for sale."),
    image_src: z.string().trim().optional().describe("Public image URL."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("artworks").insert(input).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { artwork: data },
    };
  },
});
