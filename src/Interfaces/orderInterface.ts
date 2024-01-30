export interface Product {
	id: number,
	image_url: string,
	name: string;
	sub_title: string;
	price: number;
	discount: number;
	quantity: number;
	sub_total: number;
	product_id: string;
}
export interface Address {
	email?: string;
	mobile?: string;
	address_line1?: string;
	city?: string;
	first_name?: string;
	last_name?: string;
}
export interface Order {
	status: string;
	order_id: number;
	products: Product[];
	order_date: string;
	total_amount: number;
	total_discount: number;
	grand_total: number;
	payment_method: string;
	addresses: Address;
}