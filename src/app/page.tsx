"use client"
import ProductDescription from "@/components/ProductDescription";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL, NEXT_API_URL} from "@/libs/config";

export default function Home() {

  const fetchData = async () => {
    setQuery("")
    const q = query
    console.log(q)
    setProducts([])
    const { data } = await axios.post(API_URL+"/query", { "query": q })
    console.log(data)
    setProducts(data)
  }

  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Array<{
    img_url: string,
    name: string,
    price: number
  }>>([])

  const [result, setResult] = useState<string | undefined>();
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  let chunks: BlobPart[] = [];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error('Error playing audio:', err);
            };
            // audio.play();
            try {
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async function () {
                const base64Audio = (reader.result as string).split(',')[1]; 
                if (!base64Audio) return;
                else{
                    const {data}  = await axios.post(NEXT_API_URL,{
                        audio: base64Audio
                    })
                    setQuery(data.result)
                }
              }
            } catch (error: any) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch(err => console.error('Error accessing microphone:', err));
    }
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <main className="flex bg-lightBeige md:p-24 p-5 min-h-screen flex-col items-center justify-center">
      <h1 className="font-mono text-4xl font-black text-center">
        Conversational Interface
      </h1>

      <section className="bg-blue-100 h-48 w-48 mt-5">BOT HERE</section>

      <section className="flex lg:justify-center overflow-y-auto space-x-2 w-full h-80 my-5">
      { products.length > 0 &&
        products.map((ele, idx) => {
          return(
            <ProductDescription
              key={idx}
              image_url={ele.img_url}
              product_name={ele.name}
              retailer="Logadith"
              price={ele.price}
              category="Shampoo"
          />)
        })
      }
      </section>
        <input
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
            className="bg-white my-5 border border-2 text-lg p-2 mx-2"
        />
        <button
            onClick={() => fetchData()}
            className="border border-2 px-3"
        >Click</button>
        <button 
            className="m-3 border border-2 px-3"
            onClick={() => {recording ? stopRecording() : startRecording()}}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
    </main>
  );
}
