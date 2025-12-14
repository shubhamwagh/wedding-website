'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import SpotifySearch from './spotify-search';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { submitRsvp } from '@/app/actions/rsvpSubmit';
import { WandSparkles } from 'lucide-react';
import Link from 'next/link';

export const FormSchema = z.object({
  fullname: z.string().min(3, {
    message: 'Please enter your full name',
  }),
  email: z.string().email('Please enter a valid email address'),
  will_attend_wedding: z.enum(['yes', 'no'], {
    required_error: 'Please confirm your assistance to the wedding',
  }),
  will_attend_fnight: z.enum(['yes', 'no'], {
    required_error: 'Please confirm your assistance to the friday night',
  }),
  recommended_song: z.string().optional(),
  recommended_song_label: z.string().optional(),
  comments: z.string().optional(),
});

export function RSVPForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: '',
      email: '',
      will_attend_wedding: undefined,
      will_attend_fnight: undefined,
      recommended_song: '',
      recommended_song_label: '',
      comments: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const result = await submitRsvp(data);
    setIsLoading(false);

    if (result.success) {
      form.reset();
      setSuggestion('');
      toast({ 
        title: "🎉 RSVP Confirmed!",
        description: "We've received your response. We can't wait to celebrate with you!",
      });
    } else {
      toast({ 
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your RSVP. Please try again.",
        action: (
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:shubhamwagh48@gmail.com?subject=RSVP%20Form%20Error&body=Hi,%20I%20encountered%20an%20error%20while%20submitting%20the%20RSVP%20form.%20Please%20help.">Contact Us</Link> 
          </Button>
        ),
      });
    }
  };

  const handleSuggestComment = async () => {
    setIsSuggesting(true);
    setSuggestion('');
    const attendanceStatus = form.getValues('will_attend_wedding');
    const fullName = form.getValues('fullname') || '';
    const existingComment = form.getValues('comments') || '';
    const recommendedSongLabel = form.getValues('recommended_song_label') || '';

    if (!fullName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Name',
        description: 'Please enter your name before getting a suggestion.',
      });
      setIsSuggesting(false);
      return;
    }

    try {
      const response = await fetch('/api/suggest-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAttending: attendanceStatus,
          fullname: fullName,
          existingComment: existingComment,
          recommendedSongLabel: recommendedSongLabel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestion');
      }

      if (!response.body) {
          throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        streamedText += chunk;
        setSuggestion(streamedText);
      }

    } catch (error) {
      console.error('Error fetching suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: 'Could not generate a comment suggestion.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleAcceptSuggestion = () => {
    const currentComment = form.getValues('comments') || '';
    const separator = currentComment.trim() ? ' ' : '';
    form.setValue('comments', currentComment + separator + suggestion, { shouldValidate: true });
    setSuggestion('');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="border-light-gray"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-[red]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  className="border-light-gray"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-[red]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="will_attend_wedding"
          render={({ field }) => (
            <FormItem className="flex w-full max-w-xs flex-wrap items-center justify-between">
              <FormLabel>Will we see you there?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center"
                  disabled={isLoading}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 [&+label]:[&_input:checked]:bg-light-gray">
                    <FormControl>
                      <RadioGroupItem value="yes" hidden />
                    </FormControl>
                    <FormLabel className="cursor-pointer rounded-lg border border-light-gray px-3 py-2 font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 [&+label]:[&_input:checked]:bg-light-gray">
                    <FormControl>
                      <RadioGroupItem value="no" hidden />
                    </FormControl>
                    <FormLabel className="cursor-pointer rounded-lg border border-light-gray px-3 py-2 font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="flex-1 text-xs text-[red]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="will_attend_fnight"
          render={({ field }) => (
            <FormItem className="flex w-full max-w-xs flex-wrap items-center justify-between">
              <FormLabel>Will you attend Friday Night?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center"
                  disabled={isLoading}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 [&+label]:[&_input:checked]:bg-light-gray">
                    <FormControl>
                      <RadioGroupItem value="yes" hidden />
                    </FormControl>
                    <FormLabel className="cursor-pointer rounded-lg border border-light-gray px-3 py-2 font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 [&+label]:[&_input:checked]:bg-light-gray">
                    <FormControl>
                      <RadioGroupItem value="no" hidden />
                    </FormControl>
                    <FormLabel className="cursor-pointer rounded-lg border border-light-gray px-3 py-2 font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="flex-1 text-xs text-[red]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommended_song"
          render={({ field }) => (
            <SpotifySearch field={field} form={form} disabled={isLoading} />
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Comments</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSuggestComment}
                  disabled={isLoading || isSuggesting}
                  className="text-xs"
                >
                  {isSuggesting ? (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  ) : (
                    <WandSparkles className="mr-1 h-3 w-3" />
                  )}
                  Suggest
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Anything else you want to share?"
                  className="border-light-gray"
                  {...field}
                />
              </FormControl>
              {suggestion && !isSuggesting && (
                <div className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-3 text-sm text-gray-600">
                   <p className="mb-2 font-medium">Suggestion:</p>
                  <p className="italic">{suggestion}</p>
                  <div className="mt-3 flex justify-center">
                     <Button
                       type="button"
                       variant="outline"
                       className="rounded-full px-4 py-1"
                       onClick={handleAcceptSuggestion}
                     >
                       Accept Suggestion
                     </Button>
                  </div>
                </div>
              )}
              <FormMessage className="text-xs text-[red]" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit your RSVP
        </Button>
      </form>
    </Form>
  );
}
