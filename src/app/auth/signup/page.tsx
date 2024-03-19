"use client";
import { API_URL } from "@/libs/config";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required "),
    username: z.string().min(1, "Name is required "),
    password: z.string().min(1, "Name is required "),
    location: z.string().min(1, "Name is required "),
  });
  type formType = z.infer<typeof formSchema>;

  const onsubmit = async (params: formType) => {
    const obj = {
      name: params.name,
      email: params.username,
      password: params.password,
      location: params.location,
    };
    console.log(obj);
    try {
      await axios.post(API_URL + "/retailers/signup", obj);
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <main className="min-h-screen bg-lightBeige flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl font-black font-mono mb-10"> SIGN UP</h1>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col space-y-3 items-center"
      >
        <input
          placeholder="Name"
          {...register("name")}
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.name && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          type="text"
        />

        <input
          placeholder="Username"
          {...register("username")}
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.username && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          type="text"
        />

        <input
          placeholder="Location"
          {...register("location")}
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.location && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          type="text"
        />

        <input
          placeholder="Password"
          {...register("password")}
          className={`shadow-[5px_5px_0px_0px_rgba(0,0,0)] ${errors.password && "shadow-[5px_5px_0px_0px_rgba(220,0,0)]"} h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono`}
          type="password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
        >
          {isSubmitting ? "Loading" : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
