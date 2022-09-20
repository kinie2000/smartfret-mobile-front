export interface CustomerIn {
  id: number;
  customer_name: string;
  customer_surname: string;
  category_id: number;
  reduction_value: number;
  augmentation: number;
  customer_country: string;
  customer_mail: string;
  customer_phone: string;
  Customer_contry_code: string;
  customer_picture: string;
  customer_post_code: string;
  customer_adress: string;
  customer_city: string;
  categorie: {
    category_augmentation;
    category_reduction_value;
  };
}
