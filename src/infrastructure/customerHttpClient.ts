import type { CreateCustomerResponse, Customer } from "../domain/customer.ts";

export class CustomerHttpClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async listCustomers(): Promise<Customer[]> {
		const result = await fetch(`${this.baseUrl}/customers`);

		return result.json() as Promise<Customer[]>;
	}

	async createCustomer(
		customer: Omit<Customer, "_id">,
	): Promise<CreateCustomerResponse> {
		const result = await fetch(`${this.baseUrl}/customers`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer),
		});

		return result.json() as Promise<CreateCustomerResponse>;
	}

	async getCustomerById(id: string): Promise<Customer | null> {
		const result = await fetch(`${this.baseUrl}/customers/${id}`);
		if (result.status === 404) {
			return null;
		}

		return result.json() as Promise<Customer>;
	}
}
