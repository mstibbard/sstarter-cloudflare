import { Example } from "@sstarter-cloudflare/core/example";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text(`${Example.hello()} from Cloudflare Workers!`));

export default app;
