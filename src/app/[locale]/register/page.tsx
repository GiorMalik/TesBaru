'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { register } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('Auth');
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {t('registerButton')}
    </Button>
  );
}

export default function RegisterPage() {
  const [errorMessage, dispatch] = useFormState(register, undefined);
  const t = useTranslations('Auth');

  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline tracking-wider">{t('registerTitle')}</CardTitle>
          <CardDescription>{t('registerSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name">{t('nameLabel')}</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('passwordLabel')}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
             {errorMessage && errorMessage !== 'Success' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <SubmitButton />
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              {t('loginLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
