import { ulidFactory } from "ulid-workers";

const ulid = ulidFactory();

const prefixes = {
	user: "usr",
} as const;

export function createID(prefix: keyof typeof prefixes): string {
	return [prefixes[prefix], ulid()].join("_");
}
