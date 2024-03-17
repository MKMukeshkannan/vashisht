"use client";

import { useSearchParams } from "next/navigation";

export default function TryOut() {
  const searchParams = useSearchParams();
  const search = searchParams.get("product");

  if (search === "specs")
    return (
      <main className="min-h-screen bg-lightBeige w-full">
        <iframe className="w-full h-screen" src="./glass-try-on/index.html" />
      </main>
    );

  if (search === "cap")
    return (
      <main className="min-h-screen bg-lightBeige w-full">
        <iframe className="w-full h-screen" src="./cap/index.html" />
      </main>
    );

  return (
    <main className="flex items-center justify-center min-h-screen bg-lightBeige w-full">
      <h1 className="text-5xl font-mono font-black">TRY-OUT-NOT-FOUND</h1>
    </main>
  );
}
