import { OPEN_AI_KEY } from "@/libs/config";
import { writeFile } from "fs/promises";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { join } from "path";

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File | null = formData.get("file") as unknown as File;

    if (!file) return NextResponse.json({ status: 400 });

    const bytes = await file.arrayBuffer();
    const buffers = Buffer.from(bytes);

    const path = join("/", "tmp", "voice.wav");
    await writeFile(path, buffers);

    const response = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream("/tmp/voice.wav"),
    });

    return NextResponse.json({ status: 200, response: response });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
}
