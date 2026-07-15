import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerApiInfoResource(server: McpServer, baseUrl: string) {
	server.registerResource(
		"customers://api-info",
		"customers://api-info",
		{
			description:
				"describers the customers rest API that this MCP server wraps",
		},
		() => ({
			contents: [
				{
					uri: "customers://api-info",
					mimeType: "text/plain",
					text: `
          Customers API
          BASE_URL: ${baseUrl}
          API Endpoints:
            POST /v1/customers - Create a Customer
            GET /v1/customers - Retrieve All Customers
            GET /v1/customers/<customer_id> - Retrieve a Customer by ID
            PUT /v1/customers/<customer_id> - Update a Customer
            DELETE /v1/customers/<customer_id> - Delete a Customer

            Customers shape: {_id?: string, name: string, photo: string}
          `,
				},
			],
		}),
	);
}
