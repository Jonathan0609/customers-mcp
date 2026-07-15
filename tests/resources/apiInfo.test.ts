import assert from "node:assert";
import { after, before, describe, it } from "node:test";
import type { Client } from "@modelcontextprotocol/sdk/client";
import type { Customer } from "../../src/domain/customer.ts";
import { createTestClient } from "../helpers.ts";

describe("Customer Resources", () => {
	let client: Client;
	before(async () => {
		client = await createTestClient();
	});
	after(async () => {
		await client.close();
	});

	it("should list the customers://api-info resource", async () => {
		const { resources } = await client.listResources();

		const info = resources.find(
			(resource) => resource.uri === "customers://api-info",
		);

		assert.ok(info, "customers://api-info should exists");

		assert.deepStrictEqual(
			info.description,
			"describers the customers rest API that this MCP server wraps",
			"description should be correct",
		);
	});
});
