import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  // Methods
  setAdress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: { name: "", id: "" },
        phone: "",
      },
      setAdress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
