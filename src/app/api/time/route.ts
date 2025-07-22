import { NextResponse } from 'next/server';

export async function GET() {
  const currentTime = new Date().toISOString();
  const randomNumber = Math.floor(Math.random() * 1000);
  
  return NextResponse.json({
    timestamp: currentTime,
    randomNumber,
    message: 'This is dynamic data from the API'
  });
}