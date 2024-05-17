export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  country: { id: string, name: string };
  phone: string;
}
