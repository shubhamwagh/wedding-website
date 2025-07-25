import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Destructure the isAttending status, fullname, and existingComment from the request body
    const { isAttending, fullname, existingComment, recommendedSongLabel } = await req.json();

    // Determine the base prompt based on attendance
    let basePrompt = '';
    const nameToUse = fullname || 'I'; // Use "I" if name is missing

    // Add song recommendation context if available (using song label)
    // Emphasize guest's desire to hear the song at the wedding
    const songContext = recommendedSongLabel ? `The guest requested the song \"${recommendedSongLabel}\" for the wedding playlist. Weave in a comment expressing excitement about hearing or dancing to this specific song at the wedding (if attending), or politely acknowledge the thoughtful request (if declining).` : '';

    if (isAttending === 'yes') {
      // Focus on excitement for the wedding and song, not the RSVP action
      basePrompt = `Write a short, positive comment expressing excitement about attending Silpa & Shubham's wedding. ${songContext} Sign it off with the name: ${nameToUse}`;
    } else if (isAttending === 'no') {
      // Keep polite decline, remove explicit RSVP thanks if possible
      basePrompt = `Write a short, polite, and regretful comment about being unable to attend Silpa & Shubham's wedding. ${songContext} Wish them a wonderful celebration. Sign it off with the name: ${nameToUse}`;
    } else {
       // Focus on politeness and song, remove explicit RSVP thanks
       basePrompt = `Write a short, polite comment regarding Silpa & Shubham's wedding RSVP. ${songContext} Sign it off with the name: ${nameToUse}`;
    }

    // Add context if there is an existing comment
    let finalPrompt = basePrompt;
    if (existingComment && existingComment.trim() !== '') {
      // Adjust continuation prompt as well
      finalPrompt = `The user has started writing the following comment regarding Silpa & Shubham's wedding RSVP: "${existingComment}". Continue writing based on the user's start, keeping the tone appropriate for the situation (${isAttending === 'no' ? 'regretful decline' : 'happy acceptance'}). Focus on the event/song excitement (if applicable) rather than the RSVP action itself. ${songContext} Make it sound natural and complete the thought. Final response should be just the suggested continuation/completion, signed off with the name: ${nameToUse}. Do not repeat the user's starting text in your response.`;
    }

    const result = await streamText({
      model: openai('gpt-4.1-nano'),
      prompt: finalPrompt,
    });

    // Respond with the stream
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating comment suggestion:', error);
    // Respond with an error status code
    return new Response('Error generating suggestion', { status: 500 });
  }
} 