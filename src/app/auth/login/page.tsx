"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const formSchema = z.object({
    userName: z.string().min(1, "Username is required "),
    password: z.string().min(1, "Password is required "),
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

  const onsubmit = () => {
    reset();
  };

  return (
    <main className="min-h-screen bg-lightBeige flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl font-black font-mono mb-10">LOGIN</h1>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col space-y-3 items-center"
      >
        <input
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.userName && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          {...register("userName")}
          placeholder="Username"
          type="text"
        />

        <input
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.password && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          {...register("password")}
          placeholder="Password"
          type="text"
        />

        <Link
          href="/retailer"
          type="submit"
          //disabled={isSubmitting}
          className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
        >
          Login
        </Link>
      </form>
    </main>
  );
}
