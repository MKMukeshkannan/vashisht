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

export default function Admin() {
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
    const formData = new FormData();

    if (!productimage) return toast.error("Upload File");

    formData.append("image", productimage);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("category", data.category);
    formData.append("size", data.size);
    formData.append("description", data.description);

    axios
      .post(`${API_URL}api/admin/upload-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        reset();
        toast("SUCESS 🎉", toastOptions);
      })
      .catch(() => {
        toast.error("ERROR ❌", toastOptions);
      });
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
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />

          <ProductDescription
            image_url="https://fastly.picsum.photos/id/54/200/300.jpg?hmac=Vj23spqBn9b_PrCh4LPiDrcffi6svfFFmjWMfycPVRE"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://fastly.picsum.photos/id/54/200/300.jpg?hmac=Vj23spqBn9b_PrCh4LPiDrcffi6svfFFmjWMfycPVRE"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
          <ProductDescription
            image_url="https://fastly.picsum.photos/id/54/200/300.jpg?hmac=Vj23spqBn9b_PrCh4LPiDrcffi6svfFFmjWMfycPVRE"
            product_name="Sample1"
            price={100}
            category="Cap"
            retailer="Mukesh"
          />
        </section>
      </section>
    </main>
  );
}
