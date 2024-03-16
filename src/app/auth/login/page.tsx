export default function Login() {
  return (
    <main className="min-h-screen bg-lightBeige flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl font-black font-mono mb-10">LOGIN</h1>

      <form className="flex flex-col space-y-3 items-center">
        <input
          className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
          placeholder="Username"
          type="text"
        />

        <input
          className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] h-10 text-2xl rounded-md border border-accBlack focus:outline-none p-1.5 font-mono"
          placeholder="Password"
          type="text"
        />

        <button
          type="submit"
          className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}
