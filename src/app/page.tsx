import ProductDescription from "@/components/ProductDescription";

export default function Home() {
  return (
    <main className="flex bg-lightBeige md:p-24 p-5 min-h-screen flex-col items-center justify-center ">
      <h1 className="font-mono text-4xl font-black text-center">
        Conversational Interface
      </h1>

      <section className="bg-blue-100 h-48 w-48">BOT HERE</section>

      <section className="flex lg:justify-center overflow-y-auto space-x-2 w-full h-80">
        <ProductDescription
          product_name="Clinic+"
          retailer="Dharanee"
          price={1000}
          category="Shampoo"
        />
        <ProductDescription
          product_name="I need a long product description"
          retailer="Whatsav"
          price={10_000}
          category="Home Appliance"
        />
        <ProductDescription
          product_name="Shirt"
          price={100}
          retailer="Sri Man"
          category="Wearable"
        />
      </section>
    </main>
  );
}
