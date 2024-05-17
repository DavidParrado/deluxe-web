import prisma from "@/lib/prisma";

interface ContactInfo {
  address: string;
  city: string;
  country: { name: string, code: string };
  zipCode: string;
}

export const setContactInfo = async (
  userId: string,
  contactInfo: ContactInfo
) => {
  
}
