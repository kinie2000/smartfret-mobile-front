export interface CommandInt {
  id: number;
  purchase_order_number: string;
  purchase_order_title: string;
  container_status: string;
  purchase_order_number_packet: number;
  divisor_value: number;
  purchase_order_description: string;
  accept_terme: number;
  total_amount: number;
  has_paid: number;
  paid: number;
  rest: number;
  signature: string;
  purchase_order_isDraft: number;
  Delivery_address: string;
  barcode_printed: number;
  purchase_order_verified: string;
  purchase_order_date: Date;
  customer_id: number;
  receiver_id: number;
  user_id: number;
  num_incriment: number;
  user_name: string;
  packet_status: string;
  receiver: {
    receiver_name: string;
  };
}
