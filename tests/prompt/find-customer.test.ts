import assert from "node:assert";
import { after, before, describe, it } from "node:test";
import type { Client } from "@modelcontextprotocol/sdk/client";
import { createTestClient } from "../helpers.ts";

describe("Customer Prompts", async () => {
	let client: Client;

	before(async () => {
		client = await createTestClient();
	});

	after(async () => {
		await client.close();
	});

	it("should return the find_customer_prompt", async () => {
		const result = await client.getPrompt({
			name: "find_customer_prompt",
			arguments: { name: "Jonathan" },
		});
		const text = result.messages[0].content;
		assert.ok(
			"text" in text && text.text.includes("get_customer"),
			"Prompt should reference the get_customer tool",
		);
		assert.ok(
			"text" in text && text.text.includes("Jonathan"),
			"Prompt should include the query",
		);
	});
});
