import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function GET() {
  try {
    const isAvailable = await geminiService.isAvailable();
    
    if (isAvailable) {
      return NextResponse.json({
        available: true,
        service: 'Google Gemini',
        model: 'gemini-1.5-flash',
        status: 'Connected and ready',
      });
    } else {
      return NextResponse.json({
        available: false,
        service: 'Google Gemini',
        message: 'Gemini API is not available. Please check your API key configuration.',
        setupUrl: 'https://makersuite.google.com',
      });
    }
  } catch (error) {
    console.error('Error checking Gemini status:', error);
    return NextResponse.json({
      available: false,
      service: 'Google Gemini',
      error: 'Failed to check Gemini status',
    });
  }
}
