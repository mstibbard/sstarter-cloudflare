import { ulidFactory } from "ulid-workers";
import { z } from "zod";

const ulid = ulidFactory();

const prefixes = {
	user: "usr",
} as const;

export function createID(prefix: keyof typeof prefixes): string {
	return [prefixes[prefix], ulid()].join("_");
}

export function prefixedUlid(prefix: keyof typeof prefixes) {
	const fullPrefix = `${prefixes[prefix]}_`;

	return z
		.string()
		.refine(
			(val) => {
				if (!val.startsWith(fullPrefix)) {
					return false;
				}

				const ulidPart = val.slice(fullPrefix.length);
				try {
					z.string().ulid().parse(ulidPart);
					return true;
				} catch {
					return false;
				}
			},
			{
				message: `Invalid ID format: must start with '${fullPrefix}' followed by a valid ULID`,
			},
		)
		.openapi({
			example: `${fullPrefix}01J9FK490M01WRYV95S5JQ8XP8`,
		});
}
