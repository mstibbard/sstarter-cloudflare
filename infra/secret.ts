export const secret = {
	CloudflareD1ApiToken: new sst.Secret(
		"CloudflareD1ApiToken",
		process.env.CLOUDFLARE_API_TOKEN,
	),
};
