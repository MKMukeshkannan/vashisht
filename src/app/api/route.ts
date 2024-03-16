import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import util from 'util';
import { exec } from 'child_process';
import OpenAI from "openai";

const execAsync = util.promisify(exec);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST (request: NextRequest) {
  const req = await request.json()
  const base64Audio = req.audio
  const audio = Buffer.from(base64Audio, 'base64');
  try{
      const text = await convertAudioToText(audio); 
      return NextResponse.json({result: text}, {status:200});
  }catch(error: any){
      if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, {status:500});
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json({ error: "An error occurred during your request." }, {status:500});
    }
  }
}

async function convertAudioToText(audioData: Buffer): Promise<string> {
  const mp3AudioData = await convertAudioToMp3(audioData);

  const outputPath = '/tmp/output.mp3';
  fs.writeFileSync(outputPath, mp3AudioData);

  const response = await openai.audio.transcriptions.create(
    { model: 'whisper-1', file: fs.createReadStream(outputPath) }
  );

  fs.unlinkSync(outputPath);

  const transcribedText: string =  response.text;
  return transcribedText;
}

async function convertAudioToMp3(audioData: Buffer): Promise<Buffer> {
  const inputPath = '/tmp/input.webm';
  fs.writeFileSync(inputPath, audioData);

  console.log("Sucksess")
  const outputPath = '/tmp/output.mp3';
  await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);

  const mp3AudioData = fs.readFileSync(outputPath);

  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return mp3AudioData;
}
