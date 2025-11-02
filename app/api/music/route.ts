import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music');

    // Check if music directory exists
    if (!fs.existsSync(musicDir)) {
      return NextResponse.json([]);
    }

    // Read all files from the music directory
    const files = fs.readdirSync(musicDir);

    // Filter for audio/video files and create playlist
    const audioVideoExtensions = ['.mp3', '.mp4', '.wav', '.webm', '.ogg', '.m4a'];
    const playlist = files
      .filter((file) => audioVideoExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
      .sort() // Sort alphabetically
      .map((file) => {
        const extension = path.extname(file);
        return {
          title: file.replace(extension, ''), // Remove extension from title
          src: `/music/${file}`,
        };
      });

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error reading public directory:', error);
    return NextResponse.json([]);
  }
}
