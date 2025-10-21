import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook is from Google
    const channelId = request.headers.get('X-Goog-Channel-ID');
    const resourceId = request.headers.get('X-Goog-Resource-ID');

    if (!channelId || channelId !== process.env.GOOGLE_CHANNEL_ID) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Clear Cloudflare cache so it fetches fresh data
    const clearCacheResponse = await fetch(`${process.env.WORKER_API_URL}/api/webhook`, {
      method: 'POST',
      headers: {
        'LAZY-API-KEY': process.env.API_SECRET_TOKEN!,
      },
    });

    if (!clearCacheResponse.ok) {
      throw new Error('Failed to clear Cloudflare cache');
    }

    // Revalidate the homepage to fetch the fresh data
    revalidatePath('/');

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}