import Image from "next/image";
import Link from "next/link";

interface prop {
  product_name: string;
  retailer: string;
  price: string;
  category: string;
  image_url: string;
}

export default function ProductDescription({
  product_name,
  price,
  category,
  retailer,
  image_url,
}: prop) {
  return (
    <section className="flex flex-col w-full min-h-80 min-w-64 p-3 lg:max-w-64 bg-red-100 border-4 border-black">
      <section className="relative w-full h-0 flex-grow">
        <Image
          fill
          className="object-cover object-center border-black border-2"
          src={image_url}
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
          <Link
            href="/try-out"
            className="w-20 inline-flex items-center justify-center font-mono bg-red-400 font-bold border-2 border-black rounded-md "
          >
            Try On
          </Link>
        )}
      </section>
    </section>
  );
}
