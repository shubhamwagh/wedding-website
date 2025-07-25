import { NextRequest, NextResponse } from 'next/server';

// Define the expected structure for the RapidAPI response for better type safety
// This should match the relevant parts of the APIResults type in the client component
type RapidAPIResponse = {
  tracks?: {
    items?: Array<any>; // Use 'any' or define a more specific type if needed
  };
  // Add other potential root properties if the API might return them
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    console.error('RAPIDAPI_KEY environment variable is not set.');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(query)}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
  };

  try {
    const rapidApiResponse = await fetch(url, options);
    console.log('RapidAPI Fetch Status:', rapidApiResponse.status); // Log status on server

    if (!rapidApiResponse.ok) {
      // Log error details on the server for debugging
      const errorBody = await rapidApiResponse.text();
      console.error(`RapidAPI request failed with status: ${rapidApiResponse.status}`, errorBody);
      return NextResponse.json(
        { error: `Failed to fetch from Spotify API: Status ${rapidApiResponse.status}` },
        { status: rapidApiResponse.status } // Forward the status code
      );
    }

    const data: RapidAPIResponse = await rapidApiResponse.json();

    // Optionally, you could further process or simplify the data here before sending to client
    // For now, we'll forward the structure the client expects

    return NextResponse.json(data); // Forward the successful response

  } catch (error) {
    console.error('Error fetching from RapidAPI:', error);
    return NextResponse.json({ error: 'Internal server error during API fetch' }, { status: 500 });
  }
} 