import type {
	CreateCustomerResponse,
	Customer,
	CustomerDetailsParams,
} from "../domain/customer.ts";
import { CustomerHttpClient } from "../infrastructure/customerHttpClient.ts";

export class CustomerService {
	private readonly client: CustomerHttpClient;

	constructor(baseUrl: string) {
		this.client = new CustomerHttpClient(baseUrl);
	}

	async listCustomers(): Promise<Customer[]> {
		return this.client.listCustomers();
	}

	async createCustomer(
		customer: Omit<Customer, "_id">,
	): Promise<CreateCustomerResponse> {
		return this.client.createCustomer(customer);
	}

	async findCustomer(params: CustomerDetailsParams): Promise<Customer | null> {
		if (params._id) {
			return this.client.getCustomerById(params._id);
		}

		const customers = await this.listCustomers();

		return (
			customers.find((customer) => {
				const entries = Object.entries(params) as [keyof Customer, string][];

				return entries.every(([key, value]) => {
					const customerValue = customer[key];

					return customerValue?.includes(value);
				});
			}) ?? null
		);
	}
}
