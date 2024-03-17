"use client";

import {API_URL} from "@/libs/config";
import {useAuth} from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast, ToastContainer, ToastOptions } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter()

  const formSchema = z.object({
    userName: z.string().min(1, "Username is required "),
    password: z.string().min(1, "Password is required "),
  });
  type formType = z.infer<typeof formSchema>;
  const {setUserName, userName} = useAuth(state=>state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const onsubmit = async (params: formType) => {
    try{
      const {data} = await axios.post(API_URL+"/retailers/login", {
        "email": params.userName,
        "password": params.password
      })
      if(data.message === "True"){
        setUserName(params.userName)
        router.push("/retailer")
      }else if(data.message === "False"){
        console.log("hello nighesh")
        // toast.error("Wrong Password")
      }else{
        router.push("/auth/signup")
      }
      console.log(userName)
      console.log(data)
    }catch(err){
      console.log(err)
    }
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}
