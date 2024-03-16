"use client";

import ProductDescription from "@/components/ProductDescription";
import { API_URL } from "@/libs/config";
import axios from "axios";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const [name, setName] = useState<string>("");
  const [retailer, setRetailer] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const [texture, setTexture] = useState<File | undefined>(undefined);
  const [category, setCategory] = useState<string>("");

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

  const handlesubmit = (event: any) => {
    event.preventDefault();

    // HANDLE ERROR
    if (name.length === 0) {
      return toast.warn("Name is required", toastOptions);
    }
    if (retailer.length === 0) {
      return toast.warn("Retailer is required", toastOptions);
    }

    if (!price) {
      return toast.warn("Price is required", toastOptions);
    }
    if (isNaN(parseInt(price))) {
      if (parseInt(price) <= 0) {
        return toast.warn("Price should be positive integer", toastOptions);
      }
      return toast.warn("Price should be number", toastOptions);
    }
    if (brand.length === 0) {
      return toast.warn("Brand is required", toastOptions);
    }
    if (category.length === 0) {
      return toast.warn("Category is required", toastOptions);
    }
    if (!["top", "bottom", "foot"].includes(category)) {
      return toast.warn('Category can only be "top" "botton" or "foot" ');
    }
    if (texture === undefined) {
      return toast.warn("Upload a texture", toastOptions);
    }
    if (productimage === undefined) {
      return toast.warn("Upload Product image", toastOptions);
    }
    toast.info("Uploading!! Hold tight 🙏🏼");
    if (name && retailer && price && brand && productimage && texture) {
      const formData = new FormData();

      formData.append("image", productimage);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("retailer_name", retailer);
      formData.append("price", price);
      formData.append("texture", texture);
      formData.append("category", category);

      axios
        .post(`${API_URL}api/admin/upload-product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setPrice("");
          setProductImage(undefined);
          setTexture(undefined);
          setName("");
          setBrand("");
          setCategory("");
          setRetailer("");
          toast("SUCESS 🎉", toastOptions);
        })
        .catch(() => {
          toast.error("ERROR ❌", toastOptions);
        });
    }
  };

  return (
    <main className="flex min-h-screen items-right bg-lightBeige p-4 lg:p-24">
      <section className="w-fit">
        <h1 className="text-5xl font-black font-mono mb-10">ADMIN</h1>
        <form
          className="flex flex-col max-w-96 space-y-5"
          onSubmit={handlesubmit}
        >
          <input
            className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
            placeholder="Retailer"
            type="text"
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
          />
          <input
            className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
            placeholder="Price"
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
            placeholder="Brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
            placeholder="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

          <section>
            <h1 className="inline-flex w-2/3 text-xl font-black font-mono">
              Texture Map
            </h1>
            <FileUploader
              handleChange={(file: File) => setTexture(file)}
              name="file"
              types={["JPG", "PNG", "JPEG"]}
            />
          </section>
          <button
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
        <h1  className="text-5xl font-black font-mono mb-10">Your Products</h1>
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
