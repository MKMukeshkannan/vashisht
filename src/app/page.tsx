"use client";
import ProductDescription from "@/components/ProductDescription";
import RecordAudio from "@/components/RecordButton";
import { useProducts } from "@/store";

export default function Home() {
  const { products } = useProducts();

  return (
    <main className="flex bg-lightBeige md:p-8 p-5 min-h-screen flex-col items-center justify-center">
      <h1 className="font-mono text-7xl font-black text-center">CARA</h1>

      <RecordAudio />

      <section className="flex lg:justify-center overflow-y-auto space-x-2 w-full h-80 my-5">
        {products.length > 0 &&
          products.map((ele, idx) => {
            return (
              <ProductDescription
                key={idx}
                image_url={ele.img_url}
                product_name={ele.name}
                retailer="Logadith"
                price={ele.price}
                category="Shampoo"
              />
            );
          })}
      </section>
    </main>
  );
}
