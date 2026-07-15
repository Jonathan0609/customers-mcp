import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CustomerService } from "../../application/customerService.ts";
import {
	type CustomerDetailsParams,
	CustomerDetailsParamsSchema,
	CustomerSchema,
} from "../../domain/customer.ts";

export function registerGetCustomersTool(
	server: McpServer,
	service: CustomerService,
) {
	server.registerTool(
		"get_customer",
		{
			description: "Get customer",
			inputSchema: CustomerDetailsParamsSchema,
			outputSchema: {
				customer: CustomerSchema.nullable().describe(
					"Customer details if found, otherwise null",
				),
			},
		},
		async (params: CustomerDetailsParams) => {
			try {
				const customer = await service.findCustomer(params);

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
							text: `Failed to get customer. Error ${error instanceof Error ? error : "unknnown error"}`,
						},
					],
				};
			}
		},
	);
}
