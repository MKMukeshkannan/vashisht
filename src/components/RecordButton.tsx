"use client";

import { cache, useRef, useState } from "react";
import { useProducts } from "@/store";
import { API_URL } from "@/libs/config";
import axios from "axios";

export default function RecordAudio() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder>();
  const [shopStatus, setShopStatus] = useState<
    "inactive" | "recording" | "error" | "fetching" | "fetchProducts"
  >("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string>();

  const [recentMsg, setRecentMsg] = useState<string>("");

  const mimeType = "audio/webm";

  const { replaceProducts } = useProducts((state) => state);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (!stream) return;
    setShopStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");
      let command: string = "";
      if (sessionStorage.getItem("command")) {
        command = sessionStorage.getItem("command") as string;
      }
      formData.append("command", command);

      try {
        setShopStatus("fetching");
        const res = await fetch(`api/voice`, {
          method: "POST",
          body: formData,
        });
        const voiceResult = await res.json();

        setRecentMsg(voiceResult.response.text);

        setAudio(audioUrl);
        setAudioChunks([]);
        setShopStatus("fetchProducts");
      } catch {
        setShopStatus("error");
        setTimeout(() => {
          setShopStatus("inactive");
        }, 3000);
      }
    };
  };

  const fetchProducts = async () => {
    try {
      const productRes = await axios.post(`${API_URL}/query`, {
        query: recentMsg,
      });
      const productResult: [] = productRes.data;

      if (productResult.length !== 0) {
        replaceProducts(productResult);
      } else {
        replaceProducts([]);
      }

      setShopStatus("inactive");
    } catch (err) {
      setShopStatus("error");
      setTimeout(() => {
        setShopStatus("inactive");
      }, 3000);
    }
  };

  if (!permission) {
    return (
      <main className="relative text-center">
        <section>
          <section className="w-80 h-80" />
        </section>

        <button
          className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
          onClick={getMicrophonePermission}
          type="button"
        >
          Get Microphone
        </button>
      </main>
    );
  }

  return (
    <main className="relative text-center">
      {shopStatus === "inactive" && (
        <>
          <section className="w-80 h-80" />
          <button
            onClick={startRecording}
            className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover disabled:bg-opacity-80 disabled:hover:cursor-not-allowed "
            type="button"
          >
            Start Recording
          </button>

          <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
            {recentMsg}
          </h1>
        </>
      )}

      {shopStatus === "recording" && (
        <>
          <section className="w-80 h-80" />
          <button
            className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
            onClick={stopRecording}
            type="button"
          >
            Stop Recording
          </button>
          <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
            How can i help you ?
          </h1>
        </>
      )}

      {shopStatus === "fetching" && (
        <>
          <section className="w-80 h-80" />
          <button
            className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
            disabled
            onClick={stopRecording}
            type="button"
          >
            Loading
          </button>
          <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
            Kindly be patient, till i fetch your request..
          </h1>
        </>
      )}

      {shopStatus === "fetchProducts" && (
        <>
          <section className="w-80 h-80" />
          <button
            className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
            onClick={fetchProducts}
            type="button"
          >
            Confirm
          </button>
          <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
            {recentMsg}
          </h1>
        </>
      )}

      {shopStatus === "error" && (
        <>
          <>
            <section className="w-48 h-48" />
            <button
              className=" bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
              onClick={stopRecording}
              disabled
              type="button"
            >
              Stop Recording
            </button>
            <h1 className="  bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
              There was an error
            </h1>
          </>
        </>
      )}
    </main>
  );
}
