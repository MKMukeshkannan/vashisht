import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const formSchema = z.object({
  name: z
    .string({ required_error: "Name feild is required" })
    .min(4, "Name should be atleast 4 characters")
    .max(15, "Name should be atmost 15 characters"),
  price: z
    .string({ required_error: "Price feild is required" })
    .min(1, "Price feild is required"),
  color: z
    .string({ required_error: "Color feild is required" })
    .min(1, "Price feild is required")
    .optional(),
  category: z
    .string({ required_error: "Category feild is required" })
    .min(1, "Price feild is required"),
  size: z
    .string({ required_error: "Size feild is required" })
    .min(1, "Price feild is required")
    .optional(),
  description: z
    .string({ required_error: "Description feild is required" })
    .min(1, "Price feild is required"),
  img_url: z.string().min(1),
});
export type formType = z.infer<typeof formSchema>;

export interface userType{
    userName: string | null;
    setUserName: (name: string) => void;
}
export const useAuth = create<userType>()
(
    persist(
    (set) => ({
    userName: null,
    setUserName: (name: string) => set({ userName: name })
    }),{
        name: "user",
        storage: createJSONStorage(() => sessionStorage),
        },
    )
)

interface ProductState {
  products: formType[];
  replaceProducts: (products: formType[]) => void;
}

export const useProducts = create<ProductState>((set) => ({
  products: [],
  replaceProducts: (products) => {
    set((state) => ({
      ...state,
      products,
    }));
  },
}));
