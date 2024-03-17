"use client";

import ProductDescription from "@/components/ProductDescription";
import { API_URL } from "@/libs/config";
import axios from "axios";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {useAuth} from "@/store";
import {useRouter} from "next/navigation";

export default function Admin() {

  const router = useRouter()
  const {userName} = useAuth()
  if(userName === null) router.push('/auth/login')

  const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const formSchema = z.object({
    name: z
      .string({ required_error: "Name feild is required" })
      .min(4, "Name should be atleast 4 characters")
      .max(15, "Name should be atmost 15 characters"),
    price: z
      .string({ required_error: "Price feild is required" })
      .min(1, "Price feild is required"),
    color: z
      .string({ required_error: "Color feild is required" })
      .min(1, "Price feild is required"),
    category: z
      .string({ required_error: "Category feild is required" })
      .min(1, "Price feild is required"),
    size: z
      .string({ required_error: "Size feild is required" })
      .min(1, "Price feild is required"),
    description: z
      .string({ required_error: "Description feild is required" })
      .min(1, "Price feild is required"),
  });
  type formType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const onSubmit = (data: formType) => {

    if (!productimage) return toast.error("Upload File");

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString()?.split(',')[1] || '';

      const obj = {
        "category": data.category,
        "color": data.color,
        "size": data.size,
        "price": data.price,
        "description": data.description,
        "name": data.name,
        "retailer": userName,
        "img_data": base64String
      }

      axios
        .post(`${API_URL}/add_data`, obj)
        .then(() => {
          reset();
          toast("SUCESS 🎉", toastOptions);
        })
        .catch(() => {
          toast.error("ERROR ❌", toastOptions);
        });
    };
    reader.readAsDataURL(productimage);
  };

  return (
    <main className="flex min-h-screen items-right bg-lightBeige p-4 lg:p-24">
      <section className="w-fit">
        <h1 className="text-5xl font-black font-mono mb-10">ADMIN</h1>

        <form
          className="flex flex-col max-w-96 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.name && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Name"
            {...register("name")}
          />

          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.price && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Price"
            {...register("price")}
          />
          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.color && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Color"
            {...register("color")}
          />
          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.category && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Category"
            {...register("category")}
          />

          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.size && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Size"
            {...register("size")}
          />
          <input
            className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.description && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
            placeholder="Description"
            {...register("description")}
          />
          <section>
            <h1 className="inline-flex text-xl font-black font-mono">
              Product Image
            </h1>
            <FileUploader
              handleChange={(file: File) => setProductImage(file)}
              name="file"
              types={["JPG", "PNG", "JPEG"]}
            />
          </section>

          <button
            disabled={isSubmitting}
            type="submit"
            className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
          >
            Submit
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </section>

      <section className="w-full flex flex-col px-16">
        <h1 className="text-5xl font-black font-mono mb-10">Your Products</h1>
        <section className="grid grid-cols-3 h-0 flex-grow overflow-auto ">
          <ProductDescription
            image_url="https://media.istockphoto.com/id/1209887384/photo/green-t-shirt-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=8M4gaRs-fUz6CdYEl4OblIoDvNjcRs8_Sbzs0VxWlMY="
            product_name="T-Shirt"
            price="300"
            category="shirt"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://crocodile.in/cdn/shop/files/7_478ea50e-71e9-43be-b224-1f19d0743a7a_grande.jpg?v=1707978564"
            product_name="Denim Jean"
            price="600"
            category="pant"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://crocodile.in/cdn/shop/products/1_41106bd8-85a5-4ee3-aceb-31879df3ce25_grande.jpg?v=1693207090"
            product_name="Black Denim Jean"
            price="800"
            category="pant"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://gradrsrbdbndasmpqbud.supabase.co/storage/v1/object/public/dummy/cap.png"
            product_name="Cap"
            price="50"
            category="cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://www.jiomart.com/images/product/original/rv0diktvsx/royal-son-hexagonal-blue-ray-cut-men-women-spectacles-frames-product-images-rv0diktvsx-0-202306252313.jpg?im=Resize=(500,630)"
            product_name="Sun Glases"
            price="70"
            category="specs"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://5.imimg.com/data5/YU/PD/WS/SELLER-61259432/men-s-winter-fashion-jacket-500x500.jpg"
            product_name="Jackets"
            price="1000"
            category="shirt"
            retailer="Mukesh"
          />
        </section>
      </section>
    </main>
  );
}
