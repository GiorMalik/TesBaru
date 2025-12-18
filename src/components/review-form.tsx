'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { addReview } from '@/lib/actions';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Star, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('ReviewsPage');
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {t('submitButton')}
    </Button>
  );
}

export function ReviewForm() {
  const [initialState, setInitialState] = useState<{ message: string | null }>({ message: null });
  const [state, dispatch] = useFormState(addReview, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const t = useTranslations('ReviewsPage');
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.message) {
      toast({
        title: state.message.includes('required') ? "Error" : "Success",
        description: state.message,
        variant: state.message.includes('required') ? "destructive" : "default",
      });
      if (!state.message.includes('required')) {
        formRef.current?.reset();
        setRating(0);
      }
    }
  }, [state, toast]);


  return (
    <form action={dispatch} ref={formRef} className="space-y-4">
      <div className="space-y-2">
        <Label>{t('ratingLabel')}</Label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-8 w-8 cursor-pointer transition-colors',
                (hoverRating || rating) > i ? 'text-secondary fill-secondary' : 'text-muted-foreground/30'
              )}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">{t('commentLabel')}</Label>
        <Textarea id="comment" name="comment" required />
      </div>
      <SubmitButton />
    </form>
  );
}
