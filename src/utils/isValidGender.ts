import { Gender } from "@/interfaces";

const validGenders: Gender[] = ["kid", "men", "women"];


export const isValidGender = (gender:string) => {
  return validGenders.includes(gender as Gender);
}
