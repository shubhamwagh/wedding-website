"use server";

import { z } from 'zod';
import { FormSchema } from '@/components/rsvp';

export async function submitRsvp(params: z.infer<typeof FormSchema>) {
  const data = new FormData();
  Object.keys(params).forEach((key) => {
    // Ensure optional fields are handled correctly
    const value = params[key as keyof z.infer<typeof FormSchema>];
    if (value !== undefined && value !== null) {
      data.append(key, String(value));
    } else if (key === 'recommended_song' || key === 'comments') {
        // Explicitly append empty string for optional text fields if needed by the endpoint
        data.append(key, ''); 
    }
  });

  const APP_URL = `https://script.google.com/macros/s/AKfycbxw07nrSL8AmTbgU-u-AWtrardWTUqq4g2hrw8lIgiQW1lDG7lHOzNBeTAiKPhXTmzJ/exec`;

  try {
    const request = await fetch(APP_URL, {
      method: 'POST',
      body: data,
    });

    // Check if the request was successful
    if (!request.ok) {
      let errorBody = 'Unknown error';
      try {
        // Try to parse the error response body
        errorBody = await request.text(); // Use text() first in case it's not JSON
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      console.error('Submission failed:', request.status, errorBody);
      throw new Error(`Submission failed: ${request.status} - ${errorBody}`);
    }

    // Try parsing the JSON response
    let resp;
    try {
       resp = await request.json();
       console.log({ resp });
       return { success: true, data: resp };
    } catch (jsonError) {
        console.error('Failed to parse success response as JSON:', jsonError);
        // Decide how to handle non-JSON success response, maybe return success without data?
        return { success: true, data: 'Submission successful, but response was not JSON.' }; 
    }

  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error: error instanceof Error ? error.message : 'An unknown network error occurred' };
  }
} 