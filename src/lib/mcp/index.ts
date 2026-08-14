import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listArtworksTool from "./tools/list-artworks";
import createArtworkTool from "./tools/create-artwork";
import updateArtworkTool from "./tools/update-artwork";
import listProjectsTool from "./tools/list-projects";
import listMessagesTool from "./tools/list-messages";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "kassiamarin",
  title: "kassiamarin",
  version: "0.1.0",
  instructions:
    "Tools for the Kassia Marin studio site. Browse and manage gallery artworks and portfolio projects, and read contact form messages. Write tools and messages require an admin account.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listArtworksTool, createArtworkTool, updateArtworkTool, listProjectsTool, listMessagesTool],
});
