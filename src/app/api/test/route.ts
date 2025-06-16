import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: 'Database connected successfully!' });
  } catch (error: any) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to database',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 