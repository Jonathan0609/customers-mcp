import z from "zod";

export const CustomerSchema = z.object({
	_id: z.string().optional(),
	name: z.string(),
	phone: z.string(),
});

export type Customer = z.infer<typeof CustomerSchema>;

export type CreateCustomerResponse = {
	message: string;
	id: string;
};

export const CustomerDetailsParamsSchema = z.object({
	_id: z.string().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
});

export type CustomerDetailsParams = z.infer<typeof CustomerDetailsParamsSchema>;
