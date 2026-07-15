import assert from "node:assert";
import { after, before, describe, it } from "node:test";
import type { Client } from "@modelcontextprotocol/sdk/client";
import type {
	CreateCustomerResponse,
	Customer,
} from "../../src/domain/customer.ts";
import { createTestClient } from "../helpers.ts";

type CustomersResult = {
	structuredContent: {
		customers: Customer[];
	};
};

type CustomerResult = {
	structuredContent: {
		customer: Customer;
	};
};

type CreateCustomerResult = {
	structuredContent: CreateCustomerResponse;
};

describe("Customer MCP Suite", () => {
	let client: Client;
	before(async () => {
		client = await createTestClient();
	});
	after(async () => {
		await client.close();
	});

	it("should list all customers", async () => {
		const result = (await client.callTool({
			name: "list_customers",
			arguments: {},
		})) as unknown as CustomersResult;

		assert.ok(
			Array.isArray(result.structuredContent.customers),
			"Should return an array of customers",
		);
	});

	it("should create customer", async () => {
		const customer = {
			name: "Rize",
			phone: "3122412232",
		};

		const result = (await client.callTool({
			name: "create_customer",
			arguments: customer,
		})) as unknown as CreateCustomerResult;

		assert.ok(result.structuredContent.id, "Should contain id");

		assert.ok(
			result.structuredContent.message,
			`user ${customer.name} created!`,
		);
	});

	it("should get customer", async () => {
		const customer = {
			name: "Jonathan",
			phone: "31999288992",
		};

		await client.callTool({
			name: "create_customer",
			arguments: customer,
		});

		const result = (await client.callTool({
			name: "get_customer",
			arguments: {
				name: "Jonathan",
			},
		})) as unknown as CustomerResult;

		assert.ok(result.structuredContent.customer._id, "Should contain id");

		assert.equal(
			result.structuredContent.customer.name,
			"Jonathan",
			`Compare customer name`,
		);
	});
});
