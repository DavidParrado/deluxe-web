
const validCategories = ["pantalones","zapatos","camisetas"];

export const isValidCategory = (category: string) => {
  return validCategories.includes(category);
}