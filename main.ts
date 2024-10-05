import { deepMerge } from "https://deno.land/std@0.224.0/collections/mod.ts";

const endpoints = Deno.env.get("ENDPOINTS")?.split(",");

if (!endpoints)
  throw "ENDPOINTS env var not set. Should be comma-separated list of JSON endpoints to merge";

console.log("endpoints", endpoints);

const portenv = Deno.env.get("PORT");
const port = portenv ? parseInt(portenv) : 8000;

const handler = async (_request: Request): Promise<Response> => {
  let mergedJson = {};
  for (const endpoint of endpoints) {
    try {
      const resp = await fetch(endpoint);
      const respJson = await resp.json();
      mergedJson = deepMerge(mergedJson, respJson);
    } catch(e) {
      console.error(e)
    }
  }

  return new Response(JSON.stringify(mergedJson), {
    headers: [["content-type", "application/json"]],
  });
};

console.log(`HTTP server running: http://0.0.0.0:${port}/`);
Deno.serve({ port }, handler);
