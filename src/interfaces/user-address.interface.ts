export interface UserAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  phone: string;
  city: string;
  country: { id: string, name: string }
}