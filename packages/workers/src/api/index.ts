import { User } from "@sstarter-cloudflare/core/user";
import { Hono } from "hono";

const app = new Hono();

app.post("/users", async (c) => {
	const body = await c.req.json();
	const result = await User.create(body.email);
	return c.json(result);
});
app.get("/users/:id", async (c) =>
	c.json(await User.fromID(c.req.param("id"))),
);

export default app;
