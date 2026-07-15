import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import type { CustomerService } from "../../application/customerService.ts";

export function registerCreateCustomerTool(
	server: McpServer,
	service: CustomerService,
) {
	server.registerTool(
		"create_customer",
		{
			description: "Create customer",
			inputSchema: {
				name: z.string().describe("Full name of the customer"),
				phone: z.string().describe("Phone number of the customer"),
			},
			outputSchema: {
				id: z.string().describe("MongoDB ObjectID of newerly create customer"),
				message: z.string().describe("Confirmation message"),
			},
		},
		async ({ name, phone }) => {
			try {
				const customer = await service.createCustomer({ name, phone });

				return {
					content: [{ type: "text", text: JSON.stringify(customer) }],
					structuredContent: {
						customer,
					},
				};
			} catch (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Failed to create customer. Error ${error instanceof Error ? error : "unknnown error"}`,
						},
					],
				};
			}
		},
	);
}
