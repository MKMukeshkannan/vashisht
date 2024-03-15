import Image from "next/image";

interface prop {
  product_name: string;
  retailer: string;
  price: number;
  category: string;
}

export default function ProductDescription({
  product_name,
  price,
  category,
  retailer,
}: prop) {
  return (
    <section className="flex flex-col w-full min-w-64 p-3 lg:max-w-64 bg-red-100 border-4 border-black">
      <section className="relative w-full h-0 flex-grow">
        <Image
          fill
          className="object-cover object-center border-black border-2"
          src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR2tefi5ek26GZJH9dNXLA7V6LYLOcKuJNmm5V_22X_pibyy2dF_gr1goKFtv--pe50FLi7fMNCASyHhXhRweb6QWTy6sTwg2GPu0QDaa_shLIHyFbX5yxCZw"
          alt="java"
        />
      </section>

      <section className="flex mt-2 pt-1">

        <section className="w-0 flex-grow">
          <h1 className="font-mono whitespace-nowrap text-xl overflow-hidden text-ellipsis font-bold ">
            {product_name}
          </h1>
          <h1 className="font-mono text-xs font-bold">({retailer})</h1>
          <h1 className="font-mono text-2xl font-bold">$ {price}</h1>
        </section>

        {category && (
          <button className="w-20 font-mono bg-red-400 font-bold border-2 border-black rounded-md ">
            Try On
          </button>
        )}
      </section>
    </section>
  );
}
