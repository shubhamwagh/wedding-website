'use client';
import debounce from 'debounce';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { FormSchema } from './rsvp';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type SpotifySearchT = {
  field: ControllerRenderProps<z.infer<typeof FormSchema>, 'recommended_song'>;
  form: UseFormReturn<z.infer<typeof FormSchema>, any>;
  disabled: boolean;
};

type SongResults = Array<{ label: string; value: string; image: string }>;
type APIResults = {
  tracks?: {
    items?: Array<{
      data?: {
        id: string;
        name: string;
        artists?: {
          items?: Array<{
            profile?: { name?: string };
          }>;
        };
        albumOfTrack?: {
          coverArt?: {
            sources?: Array<{ url: string }>;
          };
        };
      };
    }>;
  };
};

export default function SpotifySearch({
  field,
  form,
  disabled,
}: SpotifySearchT) {
  const [songResults, setSongResults] = useState<SongResults>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = debounce(async (query: string) => {
    if (!query) {
      setSongResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSongResults([]);

    try {
      const req = await fetch(`/api/spotify-search?query=${encodeURIComponent(query)}`);

      if (!req.ok) {
        const errorText = await req.text();
        console.error(
          'API route request failed with status:',
          req.status,
          errorText,
        );
        setError(`Search failed (Status: ${req.status}). Please try again.`);
        setSongResults([]);
        setIsLoading(false);
        return;
      }

      const res = (await req.json()) as APIResults;
      console.log('Response from /api/spotify-search:', res);

      const results: SongResults = [];
      if (res.tracks && res.tracks.items && Array.isArray(res.tracks.items)) {
        res.tracks.items.forEach(({ data: track }) => {
          const trackName = track?.name;
          const trackId = track?.id;
          const artistName = track?.artists?.items?.[0]?.profile?.name;
          const imageUrl = track?.albumOfTrack?.coverArt?.sources?.[0]?.url;
          const trackValue = trackId ? `https://open.spotify.com/track/${trackId}` : undefined;

          if (trackName && artistName && trackValue && imageUrl) {
            results.push({
              label: `${trackName} - ${artistName}`,
              value: trackValue,
              image: imageUrl,
            });
          } else {
            console.warn('Skipping track due to missing data:', track);
          }
        });
      } else {
        console.warn('API response missing `tracks.items` array or is not an array:', res);
      }

      console.log('Processed Results:', results);
      setSongResults(results);
      if (results.length === 0) {
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching or processing Spotify data:', err);
      setError('An error occurred during the search. Please try again.');
      setSongResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Recomend a song</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              disabled={disabled}
              className={cn(
                'w-full justify-between rounded-lg border-light-gray',
                !field.value && 'text-gray/60',
              )}
            >
              {field.value ? (() => {
                const selectedSong = songResults.find(({ value }) => value === field.value);
                const imageSrc = selectedSong?.image;
                const label = selectedSong?.label;

                return (
                  <div className="flex items-center gap-2 truncate whitespace-nowrap">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={label || 'Selected song cover'}
                        width={30}
                        height={30}
                        className="rounded flex-shrink-0"
                      />
                    ) : null}
                    <span className="truncate whitespace-nowrap">
                      {label || 'Loading song...'}
                    </span>
                  </div>
                );
              })() : (
                <span className="truncate whitespace-nowrap">
                  Search for a song you'd like to be played at the wedding
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] border-light-gray p-1">
          <Command>
            <CommandInput
              placeholder="Search for a song..."
              className="h-9"
              onInput={(e) => onSearch(e.currentTarget.value)}
            />
            <CommandList>
              {isLoading && (
                <div className="flex items-center px-2 py-1.5 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              )}

              {!isLoading && error && (
                <div className="px-2 py-1.5 text-sm text-destructive">
                  {error}
                </div>
              )}

              {!isLoading && !error && songResults.length === 0 && (
                <CommandEmpty>No song found.</CommandEmpty>
              )}

              {!isLoading && !error && songResults.length > 0 && (
                <CommandGroup>
                  {songResults.map(({ label, value, image }) => (
                    <CommandItem
                      value={label}
                      key={value}
                      className="gap-2 px-2 py-1.5 text-sm"
                      onSelect={() => {
                        form.setValue('recommended_song', value);
                        form.setValue('recommended_song_label', label);
                        setOpen(false);
                      }}
                    >
                      <Image
                        src={image}
                        alt={label}
                        width={30}
                        height={30}
                        className="rounded"
                      />
                      {label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage className="text-xs text-[red]" />
    </FormItem>
  );
}
