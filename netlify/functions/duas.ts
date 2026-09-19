import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export interface DuaItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default async (req: Request, _context: Context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let store: ReturnType<typeof getStore> | null = null;
  try {
    store = getStore("wedding-duas");
  } catch (e) {
    console.warn("Netlify Blobs not available in current environment:", e);
  }

  // GET: Fetch all duas
  if (req.method === "GET") {
    try {
      if (!store) {
        return new Response(JSON.stringify([]), { headers: corsHeaders });
      }
      const existing = (await store.get("duas-list", { type: "json" })) as DuaItem[] || [];
      return new Response(JSON.stringify(existing), { headers: corsHeaders });
    } catch (err) {
      console.error("Error reading duas from Netlify Blobs:", err);
      return new Response(JSON.stringify([]), { headers: corsHeaders });
    }
  }

  // POST: Add new dua
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const name = String(body?.name || "").trim().slice(0, 60);
      const message = String(body?.message || "").trim().slice(0, 350);

      if (!name || !message) {
        return new Response(
          JSON.stringify({ error: "Both name and blessing message are required." }),
          { status: 400, headers: corsHeaders }
        );
      }

      const newDua: DuaItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        message,
        createdAt: new Date().toISOString(),
      };

      if (store) {
        const existing = ((await store.get("duas-list", { type: "json" })) as DuaItem[]) || [];
        const updated = [newDua, ...existing];
        await store.setJSON("duas-list", updated);
      }

      return new Response(JSON.stringify(newDua), {
        status: 201,
        headers: corsHeaders,
      });
    } catch (err) {
      console.error("Error saving dua to Netlify Blobs:", err);
      return new Response(
        JSON.stringify({ error: "Failed to save prayer blessing." }),
        { status: 500, headers: corsHeaders }
      );
    }
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: corsHeaders,
  });
};

export const config: Config = {
  path: "/api/duas",
};
