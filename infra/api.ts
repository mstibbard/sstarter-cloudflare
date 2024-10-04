export const api = new sst.cloudflare.Worker("OpenApi", {
	handler: "./packages/workers/src/api/index",
	url: true,
});

export const outputs = {
	openapi: api.url,
};
