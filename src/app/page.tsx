"use client";
import ProductDescription from "@/components/ProductDescription";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/libs/config";

export default function Home() {
  const fetchData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setQuery("");
    const q = query;
    console.log(q);
    setProducts([]);
    const { data } = await axios.post(API_URL + "/query", { query: q });
    console.log(data);
    setProducts(data);
  };

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<
    Array<{
      img_url: string;
      name: string;
      price: number;
    }>
  >([]);

  return (
    <main className="flex bg-lightBeige md:p-24 p-5 min-h-screen flex-col items-center justify-center">
      <h1 className="font-mono text-4xl font-black text-center">
        Conversational Interface
      </h1>

      <section className="bg-blue-100 h-48 w-48 mt-5">BOT HERE</section>

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
      <form className="flex" onSubmit={(e) => fetchData(e)}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="bg-white my-5 border border-2 text-lg p-2 mx-2"
        />
        <button type="submit">Click</button>
      </form>
    </main>
  );
}
